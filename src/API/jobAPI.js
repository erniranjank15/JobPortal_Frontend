import API from '../services/axios';

export const createJob = async (jobData) => API.post('/jobs/create', jobData);
export const getAllJobs = async () => API.get('/jobs/all');
export const getJobById = async (id) => API.get(`/jobs/${id}`);
export const updateJob = async (id, jobData) => API.put(`/jobs/update/${id}`, jobData);
export const deleteJob = async (id) => API.delete(`/jobs/delete/${id}`);
export const searchJob = async (keyword) => API.get(`/jobs/search?keyword=${keyword}`);
