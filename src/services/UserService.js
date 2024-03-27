import axios from 'axios';
import http from './http';


export const register = (userData) => {
    return axios.post(`${process.env.VUE_APP_API_URL}register`, userData);
};

export const login = (userData) => {
    return axios.post(`${process.env.VUE_APP_API_URL}login`, userData);
};

export default {
    updateUser(user_id, data) {
        return http.patch(`${process.env.VUE_APP_API_URL}user/${user_id}`, data);
    }
}