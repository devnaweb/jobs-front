import React, { Component } from "react";
import JobDataService from "../services/job.service";
import { Link } from "react-router-dom";

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);

    this.state = {
      jobs: [],
      currentJob: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveJobs();
  }

  retrieveJobs() {
    JobDataService.getAll()
      .then(response => {
        this.setState({
          jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJobs();
    this.setState({
      currentJob: null,
      currentIndex: -1
    });
  }

  setActiveJob(job, index) {
    this.setState({
      currentJob: job,
      currentIndex: index
    });
  }

  render() {
    const { jobs, currentJob, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Job List</h4>

          <ul className="list-group">
            {jobs &&
              jobs.map((job, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJob(job, index)}
                  key={index}
                >
                  {job.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentJob ? (
            <div>
              <h4>Job</h4>
              <div>
                <label>
                  <strong>Occupation:</strong>
                </label>{" "}
                {currentJob.occupation}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentJob.company}
              </div>
              <div>
                <label>
                  <strong>Salary:</strong>
                </label>{" "}
                {currentJob.salary}
              </div>
              <div>
                <label>
                  <strong>Home Office:</strong>
                </label>{" "}
                {currentJob.homeOffice ? "Sim" : "Não"}
              </div>

              <Link
                to={"/jobs/" + currentJob.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}