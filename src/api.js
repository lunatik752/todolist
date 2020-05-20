import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
})

const api = {

    createTodoList(title) {
        return instance.post('', {title: title})
    },
    getTodoList() {
        return instance.get('')
    },
    getTasks(todolistId) {
        return instance.get(`${todolistId}/tasks`)
    },
    createTasks(newText, todolistId) {
        return instance.post(`${todolistId}/tasks`, {title: newText})
    },
    updateTask(task, obj, todolistId, taskId) {
        return instance.put(`${todolistId}/tasks/${taskId}`, {...task, ...obj})
    },
    deleteTodoList(todolistId) {
        return instance.delete(`${todolistId}`,)
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`${todolistId}/tasks/${taskId}`,)
    },
    changeTodoListTitle(todolistId, title) {
        return instance.put(`${todolistId}`, {title: title});
    }
}

export default api;

















