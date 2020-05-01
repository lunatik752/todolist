import {createStore} from "redux";


const initialState = {
    todolists: [
        {id: 0, title: "css", tasks: []},
        {id: 1, title: "html", tasks: []},
        {id: 2, title: "react", tasks: []}
    ]
}

const reducer = (state = initialState, action) => {
    let newTodolist;
    switch (action.type) {
        case "ADD-TODOLIST":
            newTodolist = [...state.todolists, action.newTodoList];
            return {...state, todolists: newTodolist};
        case 'ADD-TASK':
            newTodolist = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, tasks: [...todo.tasks, action.newTask]}
                }
            })
            return {...state, todolists: newTodolist};
        case 'CHANGE-TASK':
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
        case 'DELETE-TODOLIST':
            return {
                ...state,
                todolists: state.todolists.filter(todolist => todolist.id !== action.todolistId)
            }
        case 'DELETE-TASK':
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


const store = createStore(reducer);
export default store;