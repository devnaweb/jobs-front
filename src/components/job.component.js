import React, { Component } from "react";
import JobDataService from "../services/job.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.getJob = this.getJob.bind(this);
    this.updateHomeOffice = this.updateHomeOffice.bind(this);
    this.updateJob = this.updateJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);

    this.state = {
      currentJob: {
        id: null,
        occupation: "",
        company: "", 
        salary: false,
        homeOffice: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getJob(this.props.match.params.id);
  }

  onChangeOccupation(e) {
    const occupation = e.target.value;

    this.setState(function(prevState) {
      return {
        currentJob: {
          ...prevState.currentJob,
          occupation: occupation
        }
      };
    });
  }

  onChangeCompany(e) {
    const company = e.target.value;
    
    this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        company: company
      }
    }));
  }

  onChangeSalary(e) {
    const salary = e.target.value;
    
    this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        salary: salary
      }
    }));
  }

  getJob(id) {
    JobDataService.get(id)
      .then(response => {
        this.setState({
          currentJob: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateHomeOffice(homeOffice) {
    var data = {
      id: this.state.currentJob.id,
      occupation: this.state.currentJob.occupation,
      company: this.state.currentJob.company,
      salary: this.state.currentJob.salary,
      homeOffice: homeOffice
    };

    JobDataService.update(this.state.currentJob.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentJob: {
            ...prevState.currentJob,
            homeOffice: homeOffice
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateJob() {
    JobDataService.update(
      this.state.currentJob.id,
      this.state.currentJob
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The job was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJob() {    
    JobDataService.delete(this.state.currentJob.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/jobs')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJob } = this.state;

    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            <form>
              <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  id="occupation"
                  value={currentJob.occupation}
                  onChange={this.onChangeOccupation}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  value={currentJob.company}
                  onChange={this.onChangeCompany}
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  value={currentJob.salary}
                  onChange={this.onChangeSalary}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Home office:</strong>
                </label>
                {currentJob.homeOffice ? "Sim" : "Não"}
              </div>
            </form>

            {currentJob.homeOffice ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateHomeOffice(false)}
              >
                Presencial
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateHomeOffice(true)}
              >
                Home office
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJob}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateJob}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  }
}