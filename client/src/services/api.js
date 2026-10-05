import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api' 
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Dashboard
export const getDashboard = () => API.get('/dashboard');

// Aptitude
export const getAptitudeQuestions = (params) => API.get('/aptitude/questions', { params });
export const startQuiz = (params) => API.get('/aptitude/quiz', { params });
export const submitQuizAttempt = (data) => API.post('/aptitude/attempt', data);
export const getQuizHistory = () => API.get('/aptitude/history');

// Coding
export const getCodingProblems = (params) => API.get('/coding', { params });
export const getCodingProblem = (id) => API.get(`/coding/${id}`);
export const markProblemSolved = (id) => API.post(`/coding/${id}/complete`);

// Interview
export const getInterviewQuestions = (params) => API.get('/interview', { params });
export const getInterviewQuestion = (id) => API.get(`/interview/${id}`);
export const markInterviewComplete = (id) => API.post(`/interview/${id}/complete`);

// Resources
export const getResources = (params) => API.get('/resources', { params });

// Admin
export const createAptitude = (data) => API.post('/admin/aptitude', data);
export const updateAptitude = (id, data) => API.put(`/admin/aptitude/${id}`, data);
export const deleteAptitude = (id) => API.delete(`/admin/aptitude/${id}`);
export const createCoding = (data) => API.post('/admin/coding', data);
export const updateCoding = (id, data) => API.put(`/admin/coding/${id}`, data);
export const deleteCoding = (id) => API.delete(`/admin/coding/${id}`);
export const createInterview = (data) => API.post('/admin/interview', data);
export const updateInterview = (id, data) => API.put(`/admin/interview/${id}`, data);
export const deleteInterview = (id) => API.delete(`/admin/interview/${id}`);
export const createResource = (data) => API.post('/admin/resources', data);
export const updateResource = (id, data) => API.put(`/admin/resources/${id}`, data);
export const deleteResource = (id) => API.delete(`/admin/resources/${id}`);

export default API;
