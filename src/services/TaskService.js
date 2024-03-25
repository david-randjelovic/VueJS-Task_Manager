import http from './http';


export default {
    createTask(data) {
      return http.post(`${process.env.VUE_APP_API_URL}tasks`, data);
    },
    getTasks() {
      return http.get(`${process.env.VUE_APP_API_URL}tasks`);
    },
    updateTasksList(data) {
      return http.patch(`${process.env.VUE_APP_API_URL}tasks/${data.task_id}`, {list_id: data.list_id});
    },
    editTask(data) {
        return http.patch(`${process.env.VUE_APP_API_URL}task/${data.task_id}`, {title: data.title, description: data.description});
    },
    deleteTask(data) {
        return http.delete(`${process.env.VUE_APP_API_URL}tasks/${data.task_id}`, {});
    }
};