export const ADD_TODOLIST = "todolist/reducer/ADD-TODOLIST"
export const CHANGE_TASK = "todolist/reducer/CHANGE-TASK"
export const ADD_TASK = "todolist/reducer/ADD-TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE-TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE-TASK"
export const SET_TODOLISTS = "todolist/reducer/SET-TODOLISTS"
export const SET_TASKS = "todolist/reducer/SET-TASKS"
export const CHANGE_TODOLIST_TITLE = "todolist/reducer/CHANGE_TODOLIST_TITLE"


const initialState = {
    todolists: []
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
    }
    return state;
}

export const setTodoListsAC = (todolists) => {

    return {type: SET_TODOLISTS, todolists};
}

export const addTodolistAC = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList: newTodoList
    };
}


export const setTaskAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}


export const addTaskAC = (newTask) => {
    return {
        type: ADD_TASK,
        newTask: newTask,
    };
}

export const changeTaskAC = (task) => {
    return {
        type: CHANGE_TASK,
        task
    };
}

export const deleteTodoListAC = (todolistId) => {
    return {
        type: DELETE_TODOLIST,
        todolistId: todolistId,
    };
}

export const deleteTaskAC = (todolistId, taskId) => {
    return {
        type: DELETE_TASK,
        todolistId: todolistId,
        taskId: taskId
    };
}
export const changeTodoListTitleAC = (todolistId, title) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistId,
        title
    };
}



