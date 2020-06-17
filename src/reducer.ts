import api from "./api";
import {TaskType, TodoListType} from "./types/entities";
import {Dispatch} from "redux";

export const ADD_TODOLIST = "todolist/reducer/ADD-TODOLIST"
export const CHANGE_TASK = "todolist/reducer/CHANGE-TASK"
export const ADD_TASK = "todolist/reducer/ADD-TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE-TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE-TASK"
export const SET_TODOLISTS = "todolist/reducer/SET-TODOLISTS"
export const SET_TASKS = "todolist/reducer/SET-TASKS"
export const CHANGE_TODOLIST_TITLE = "todolist/reducer/CHANGE_TODOLIST_TITLE"
export const TOGGLE_IS_WAITING_TODO
    = "todolist/reducer/TOGGLE_IS_WAITING_TODO"
export const TOGGLE_IS_WAITING_TASK
    = "todolist/reducer/TOGGLE_IS_WAITING_TASK"


type InitialStateType = {
    todoLists: Array<TodoListType>
    isWaitingTodo: boolean,
    isWaitingTask: boolean,
}


const initialState: InitialStateType = {
    todoLists: [],
    isWaitingTodo: false,
    isWaitingTask: false,
}

export const reducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todoLists: action.todoLists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [action.newTodoList, ...state.todoLists,]
            };
        case SET_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {...todo, tasks: [action.newTask, ...todo.tasks]}
                    } else {
                        return todo
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if (todo.id === action.todoListId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...action.task};
                                }
                            })
                        }
                    } else {
                        return todo
                    }
                })
            }

        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(todoList => todoList.id !== action.todoListId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId) {
                        return todo
                    } else {
                        return {...todo, tasks: todo.tasks.filter(t => t.id !== action.taskId)}
                    }
                })
            }
        case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, title: action.title}
                    } else {
                        return tl
                    }
                })
            }
        case TOGGLE_IS_WAITING_TODO:
            return {
                ...state, isWaitingTodo: action.isWaitingTodo
            }
        case TOGGLE_IS_WAITING_TASK:
            return {
                ...state, isWaitingTask: action.isWaitingTask
            }
    }
    return state;
}

//action creators

type TodoActionTypes =
    AddTodoListType
    | SetTodoListType
    | SetTaskType
    | AddTaskType
    | ChangeTaskType
    | DeleteTodoListType
    | DeleteTaskType
    | ChangeTodoListTitleType
    | ToggleWaitingTodoType
    | ToggleWaitingTaskType


type AddTodoListType = {
    type: typeof ADD_TODOLIST
    newTodoList: TodoListType
}
const addTodoList = (newTodoList: TodoListType): AddTodoListType => {
    return {
        type: ADD_TODOLIST,
        newTodoList: newTodoList
    };
}


type SetTodoListType = {
    type: typeof SET_TODOLISTS
    todoLists: Array<TodoListType>
}


const setTodoLists = (todoLists: Array<TodoListType>): SetTodoListType => {
    return {type: SET_TODOLISTS, todoLists};
}

type SetTaskType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todoListId: string
}

const setTasks = (tasks: Array<TaskType>, todoListId: string): SetTaskType => {
    return {type: SET_TASKS, tasks, todoListId};
}

type AddTaskType = {
    type: typeof ADD_TASK
    todoListId: string
    newTask: TaskType
}

const addTask = (newTask: TaskType, todoListId: string): AddTaskType => {
    return {
        type: ADD_TASK,
        newTask,
        todoListId,
    };
}

type ChangeTaskType = {
    type: typeof CHANGE_TASK
    taskId: string
    task: TaskType
    todoListId: string
}

const changeTask = (taskId: string, task: TaskType, todoListId: string): ChangeTaskType => {
    return {
        type: CHANGE_TASK,
        taskId,
        task,
        todoListId
    };
}

type DeleteTodoListType = {
    type: typeof DELETE_TODOLIST
    todoListId: string
}

const deleteTodoList = (todoListId: string): DeleteTodoListType => {
    return {
        type: DELETE_TODOLIST,
        todoListId: todoListId,
    };
}

type DeleteTaskType = {
    type: typeof DELETE_TASK
    todoListId: string
    taskId: string
}

const deleteTask = (todoListId: string, taskId: string): DeleteTaskType => {
    return {
        type: DELETE_TASK,
        todoListId,
        taskId
    };
}

type ChangeTodoListTitleType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todoListId: string
    title: string
}

const changeTodoListTitle = (todoListId: string, title: string): ChangeTodoListTitleType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todoListId,
        title
    };
}

type ToggleWaitingTodoType = {
    type: typeof TOGGLE_IS_WAITING_TODO
    isWaitingTodo: boolean
}

const toggleWaitingTodo = (isWaitingTodo: boolean): ToggleWaitingTodoType => {
    return {type: TOGGLE_IS_WAITING_TODO, isWaitingTodo}
}

type ToggleWaitingTaskType = {
    type: typeof TOGGLE_IS_WAITING_TASK
    isWaitingTask: boolean
}

const toggleWaitingTask = (isWaitingTask: boolean): ToggleWaitingTaskType => {
    return {type: TOGGLE_IS_WAITING_TASK, isWaitingTask}
}

//thunk

export const getTodoLists = () => async (dispatch: Dispatch<TodoActionTypes>) => {
    dispatch(toggleWaitingTodo(true));
    let response = await api.getTodoList()
    dispatch(toggleWaitingTodo(false));
    dispatch(setTodoLists(response.data))
}

export const createNewTodoLists = (title: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    let response = await api.createTodoList(title)
    let todoList = response.data.data.item
    dispatch(addTodoList(todoList))
}

export const getTasks = (todoListId: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    dispatch(toggleWaitingTask(true));
    let response = await api.getTasks(todoListId)
    if (!response.data.error) {
        dispatch(toggleWaitingTask(false));
        let allTasks = response.data.items;
        dispatch(setTasks(allTasks, todoListId))
    }
}

export const addNewTask = (newText: string, todoListId: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    let response = await api.createTasks(newText, todoListId)
    let newTask = response.data.data.item;
    dispatch(addTask(newTask, todoListId));
}

export const updateTask = (taskId: string, todoListId: string, task: TaskType) =>
    async (dispatch: Dispatch<TodoActionTypes>) => {
        let response = await api.updateTask(taskId, todoListId, task)
        if (response.data.resultCode === 0) {
            dispatch(changeTask(taskId, task, todoListId));
        }
    }


export const delTodoList = (toDoListId: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    let response = await api.deleteTodoList(toDoListId)
    if (response.data.resultCode === 0) {
        dispatch(deleteTodoList(toDoListId))
    }
}

export const delTask = (toDoListId: string, taskId: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    let response = await api.deleteTask(toDoListId, taskId)
    if (response.data.resultCode === 0) {
        dispatch(deleteTask(toDoListId, taskId));
    }
}

export const updateTodoListTitle = (toDoListId: string, title: string) => async (dispatch: Dispatch<TodoActionTypes>) => {
    let response = await api.changeTodoListTitle(toDoListId, title)
    if (response.data.resultCode === 0) {
        dispatch(changeTodoListTitle(toDoListId, title))
    }
}