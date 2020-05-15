export const ADD_TODOLIST = "todolist/reducer/ADD-TODOLIST"
export const CHANGE_TASK = "todolist/reducer/CHANGE-TASK"
export const ADD_TASK = "todolist/reducer/ADD-TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE-TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE-TASK"
export const SET_TODOLISTS = "todolist/reducer/SET-TODOLISTS"
export const SET_TASKS = "todolist/reducer/SET-TASKS"

//наименование action дается согласно redux-ducks


const initialState = {
    todolists: [
        // {id: 0, title: "css", tasks: []},
        // {id: 1, title: "html", tasks: []},
        // {id: 2, title: "react", tasks: []}
    ]
}

export const reducer = (state = initialState, action) => {
    let newTodolist;
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl,tasks: []}))
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
            newTodolist = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {
                        ...todo, tasks: [...todo.tasks.map(task => {
                            if (task.id !== action.taskId) {
                                return task
                            } else {
                                return {...task, ...action.obj}
                            }
                        })]
                    }
                }
            })
            return {...state, todolists: newTodolist};
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

export const changeTaskAC = (todolistId, taskId, obj) => {
    return {
        type: CHANGE_TASK,
        todolistId: todolistId,
        taskId: taskId,
        obj: obj
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



