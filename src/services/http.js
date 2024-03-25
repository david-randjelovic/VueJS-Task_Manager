import axios from 'axios';
import router from '../router';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
    return Promise.reject(error);
  }
);

export default http;