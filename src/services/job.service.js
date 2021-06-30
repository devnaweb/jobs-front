import http from "../http-common";

class JobDataService {
  getAll() {
    return http.get("/api/v1/jobs/");
  }

  get(id) {
    return http.get(`/api/v1/jobs/${id}`);
  }

  create(data) {
    return http.post("/api/v1/jobs/", data);
  }

  update(id, data) {
    return http.put(`/api/v1/jobs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/v1/jobs/${id}`);
  }
}

export default new JobDataService();