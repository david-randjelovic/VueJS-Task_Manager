import axios from 'axios';


export const register = (userData) => {
    return axios.post(`${process.env.VUE_APP_API_URL}register`, userData);
};

export const login = (userData) => {
    return axios.post(`${process.env.VUE_APP_API_URL}login`, userData);
};