import React, { Component } from "react";
import JobDataService from "../services/job.service";
import "bootstrap/dist/css/bootstrap.min.css";

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeHomeOffice = this.onChangeHomeOffice.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.newJob = this.newJob.bind(this);

    this.state = {
      id: null,
      occupation: "",
      company: "", 
      salary: false,
      homeOffice: false
    };
  }

  onChangeOccupation(e) {
    this.setState({
      occupation: e.target.value
    });
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }

  onChangeHomeOffice(e) {
    this.setState({
      homeOffice: e.target.value
    });
  }

  saveJob() {
    var data = {
      occupation: this.state.occupation,
      company: this.state.company,
      salary: this.state.salary,
      isHomeOffice: this.state.homeOffice.toLowerCase() === 'sim' ? true : false
    };

    console.log(data);
    
    JobDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          occupation: response.data.occupation,
          salary: response.data.salary,
          homeOffice: response.data.homeOffice
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJob() {
    this.setState({
      id: null,
      occupation: "",
      company: "", 
      salary: "0.0",
      homeOffice: 'Não'
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newJob}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                required
                value={this.state.occupation}
                onChange={this.onChangeOccupation}
                name="occupation"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                required
                value={this.state.company}
                onChange={this.onChangeCompany}
                name="company"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                className="form-control"
                id="salary"
                required
                value={this.state.salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>

            <div className="form-group">
              <label htmlFor="homeOffice">HomeOffice</label>
              <input
                type="text"
                className="form-control"
                id="homeOffice"
                required
                value={this.state.homeOffice}
                onChange={this.onChangeHomeOffice}
                name="homeOffice"
              />
            </div>
            <button onClick={this.saveJob} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}