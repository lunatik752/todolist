import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Components/ToDoListTitle/TodoListTitle";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodoListAC, setTaskAC} from "./reducer";
import axios from 'axios'


class ToDoList extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };


    state = {
        tasks: [],
        filterValue: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    };

    _restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1;
                }
            })
        });
    };

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            }
        )
            .then(response => {
                if (!response.data.error) {
                    let allTasks = response.data.items;
                    this.props.setTasks(allTasks, this.props.id)
                }
            })
    }


    addTask = (newText) => {
        debugger
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            })
            .then(responsive => {
                debugger
                let newTask = responsive.data.data.item;
                this.props.addTask(newTask)
            })
    };


    // addTask = (newTitle) => {
    //     let newTask = {
    //         id: this.nextTaskId,
    //         title: newTitle,
    //         isDone: true,
    //         priority: 'low'
    //     };
    //     this.nextTaskId++;
    //     // let newTasks = [...this.state.tasks, newTask];
    //     this.props.addTask(this.props.id, newTask)
    //     // this.setState({
    //     //     tasks: newTasks
    //     // },() =>{this.saveState();});
    // };


    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue
            }, () => {
                this.saveState();
            }
        );
    };

    changeTask = (task, obj) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            {...task, ...obj},
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTask(response.data.data.item)
                }
            })
    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

    deleteTodoList = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            }
        )
            .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.deleteTodoList(this.props.id)
                    }
                }
            )
    }

    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })
    }


    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList_header'>
                        <TodoListTitle title={this.props.title}/>

                        <button className='detete_todoList' onClick={this.deleteTodoList}>x</button>
                    </div>
                    <AddNewItemForm addItem={this.addTask}/>
                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        deleteTask={this.deleteTask}
                        tasks={tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.status === 2;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.status === 0;
                            }
                        })}/>
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                        deleteToDoList={this.props.deleteToDoList}
                        key={this.props.key}
                    />
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setTasks(tasks, todolistId) {
            const action = setTaskAC(tasks, todolistId)
            dispatch(action)
        },
        addTask(newTask) {
            const action = addTaskAC(newTask)
            dispatch(action)
        },
        changeTask: (task) => {
            const action = changeTaskAC(task)
            dispatch(action)
        },
        deleteTodoList: (todolistId) => {
            const action = deleteTodoListAC(todolistId)
            dispatch(action)
        },
        deleteTask: (todolistId, taskId) => {
            const action = deleteTaskAC(todolistId, taskId)
            dispatch(action)
        }
    }
}


const ConnectedTodoList = connect(null, mapDispatchToProps)(ToDoList)
export default ConnectedTodoList;