import api from "./api";

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


const initialState = {
    todolists: [],
    isWaitingTodo: false,
    isWaitingTask: false,
}

export const reducer = (state = initialState, action) => {
    let newTodolist;
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            newTodolist = [...state.todolists, action.newTodoList];
            return {...state, todolists: newTodolist};
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
        case ADD_TASK:
            newTodolist = state.todolists.map(todo => {
                if (todo.id !== action.newTask.todoListId) {
                    return todo
                } else {
                    return {...todo, tasks: [...todo.tasks, action.newTask]}
                }
            })
            return {...state, todolists: newTodolist};
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.task.id) {
                                    return t;
                                } else {
                                    return {...action.task};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }

        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(todolist => todolist.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: todo.tasks.filter(task => task.id !== action.taskId)}
                    }
                })
            }
        case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
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

const setTodoLists = (todolists) => {
    return {type: SET_TODOLISTS, todolists};
}

const addTodolist = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList: newTodoList
    };
}

const setTasks = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}


const addTask = (newTask) => {
    return {
        type: ADD_TASK,
        newTask: newTask,
    };
}

const changeTask = (task) => {
    return {
        type: CHANGE_TASK,
        task
    };
}

const deleteTodoList = (todolistId) => {
    return {
        type: DELETE_TODOLIST,
        todolistId: todolistId,
    };
}

const deleteTask = (todolistId, taskId) => {
    return {
        type: DELETE_TASK,
        todolistId: todolistId,
        taskId: taskId
    };
}
const changeTodoListTitle = (todolistId, title) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistId,
        title
    };
}

const toggleWaitingTodo = (isWaitingTodo) => {
    return {type: TOGGLE_IS_WAITING_TODO, isWaitingTodo}
}

const toggleWaitingTask = (isWaitingTask) => {
    return {type: TOGGLE_IS_WAITING_TASK, isWaitingTask}
}

//thunk

export const getTodoLists = () => (dispatch, getState) => {
    dispatch(toggleWaitingTodo(true));
    api.getTodoList()
        .then(res => {
            dispatch(toggleWaitingTodo(false));
            dispatch(setTodoLists(res.data))
        });
}

export const createNewTodoLists = (title) => (dispatch, getState) => {
    api.createTodoList(title)
        .then(responsive => {
            let todolist = responsive.data.data.item;
            dispatch(addTodolist(todolist))
        })
}

export const getTasks = (todoListId) => (dispatch, getState) => {
    dispatch(toggleWaitingTask(true));
    api.getTasks(todoListId)
        .then(response => {
            if (!response.data.error) {
                dispatch(toggleWaitingTask(false));
                let allTasks = response.data.items;
                dispatch(setTasks(allTasks, todoListId))
            }
        })
}

export const addNewTask = (newText, taskId) => (dispatch, getState) => {
    api.createTasks(newText, taskId)
        .then(response => {
            let newTask = response.data.data.item;
            dispatch(addTask(newTask));
        })
}

export const updateTask = (task, obj, toDoListId, taskId) => (dispatch, getState) => {
    api.updateTask(task, obj, toDoListId, taskId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTask(response.data.data.item));
            }
        })
}

export const delTodoList = (toDoListId) => (dispatch, getState) => {
    api.deleteTodoList(toDoListId)
        .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(deleteTodoList(toDoListId))
                }
            }
        )
}

export const delTask = (toDoListId, taskId) => (dispatch, getState) => {
    api.deleteTask(toDoListId, taskId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deleteTask(toDoListId, taskId));
            }
        })
}

export const updateTodoListTitle = (toDoListId, title) => (dispatch, getState) => {
    api.changeTodoListTitle(toDoListId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodoListTitle(toDoListId, title))
            }
        })
}