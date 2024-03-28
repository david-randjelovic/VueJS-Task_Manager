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
        return http.patch(`${process.env.VUE_APP_API_URL}user`, data);
    },
    updateUserProfilePicture(data) {
        return http.post(`${process.env.VUE_APP_API_URL}user/upload-profile-picture`, data);
    },
    getUserProfilePicture() {
        return http.get(`${process.env.VUE_APP_API_URL}user/profile-picture`);
    }
}