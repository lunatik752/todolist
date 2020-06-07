import axios from "axios";
import {TaskType, TodoListType, UpdateTaskType} from "./types/entities";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
})



type CommonApiType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type GetTaskType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}



const api = {

    createTodoList(title: string) {
        return instance.post<CommonApiType<{ item: TodoListType }>>('', {title: title})
    },
    getTodoList() {
        return instance.get('')
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskType>(`${todoListId}/tasks`)
    },
    createTasks(newText: string, todoListId: string) {
        return instance.post<CommonApiType<{item: TaskType}>>(`${todoListId}/tasks`, {title: newText})
    },
    updateTask(task: TaskType, obj: UpdateTaskType, todoListId: string, taskId: string) {
        return instance.put<CommonApiType<{item: TaskType}>>(`${todoListId}/tasks/${taskId}`, {...task, ...obj})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonApiType<{}>>(`${todoListId}`,)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`${todoListId}/tasks/${taskId}`,)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return instance.put<CommonApiType<{}>>(`${todoListId}`, {title: title});
    }
}

export default api;

















