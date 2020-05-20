import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Components/ToDoListTitle/TodoListTitle";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, changeTodoListTitleAC, deleteTaskAC, deleteTodoListAC, setTaskAC} from "./reducer";
import api from "./api";


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
        api.getTasks(this.props.id)

            .then(response => {
                if (!response.data.error) {
                    let allTasks = response.data.items;
                    this.props.setTasks(allTasks, this.props.id)
                }
            })
    }


    addTask = (newText) => {
        api.createTasks(newText, this.props.id)
            .then(response => {
                let newTask = response.data.data.item;
                this.props.addTask(newTask)
            })
    };


    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue
            }, () => {
                this.saveState();
            }
        );
    };

    changeTask = (task, obj) => {
        api.updateTask(task, obj, this.props.id, task.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTask(response.data.data.item)
                }
            })
    };

    changeStatus = (task, status) => {
        this.changeTask(task, {status: status})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

    deleteTodoList = () => {
        api.deleteTodoList(this.props.id)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        this.props.deleteTodoList(this.props.id)
                    }
                }
            )
    }

    deleteTask = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })
    }

    changeTodoListTitle = (title) => {
        api.changeTodoListTitle(this.props.id, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTodoListTitle(this.props.id, title)
                }
            })


    }


    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList_header'>
                        <TodoListTitle title={this.props.title}
                                       changeTodoListTitle={this.changeTodoListTitle}/>

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
        },
        changeTodoListTitle: (todolistId, title) => {
            dispatch(changeTodoListTitleAC(todolistId, title))
        }
    }
}


const ConnectedTodoList = connect(null, mapDispatchToProps)(ToDoList)
export default ConnectedTodoList;