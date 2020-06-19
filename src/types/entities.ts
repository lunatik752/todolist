
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
    tasks: Array<TaskType>

}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title?: string
    status?: number
}