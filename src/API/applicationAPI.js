import API from '../services/axios';

export const applyForJob = async (jobId, applicationData) => API.post(`/applications/apply/${jobId}`, applicationData);
export const getMyApplications = async () => API.get('/applications/my-applications');
export const getApplicationsForJob = async (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = async (applicationId, status) => API.put(`/applications/status/${applicationId}`, { status });
