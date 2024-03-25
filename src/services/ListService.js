import http from './http';


export default {
    createList(data) {
      return http.post(`${process.env.VUE_APP_API_URL}lists`, data);
    },
    getLists() {
      return http.get(`${process.env.VUE_APP_API_URL}lists`);
    },
    editList(data) {
      return http.patch(`${process.env.VUE_APP_API_URL}lists/${data.list_id}`, {name: data.name});
    },
    deleteList(data) {
        return http.delete(`${process.env.VUE_APP_API_URL}lists/${data.list_id}`, {});
    }
};