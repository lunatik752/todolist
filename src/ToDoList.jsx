import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Components/ToDoListTitle/TodoListTitle";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTaskAC,
    CHANGE_TASK,
    changeTaskAC,
    DELETE_TASK,
    DELETE_TODOLIST, deleteTaskAC,
    deleteTodoListAC
} from "./reducer";


class ToDoList extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    };

    restoreState = () => {
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


    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: true,
            priority: 'low'
        };
        this.nextTaskId++;
        // let newTasks = [...this.state.tasks, newTask];
        this.props.addTask(this.props.id, newTask)
        // this.setState({
        //     tasks: newTasks
        // },() =>{this.saveState();});
    };


    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue
            }, () => {
                this.saveState();
            }
        );
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        });

        // this.setState({
        //     tasks: newTasks
        // }, () => {
        //     this.saveState();
        // });
    };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId, {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.props.changeTask(this.props.id, taskId, {title: title})
    };

    deleteTodoList = () => {
        this.props.deleteTodoList(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }


    render = () => {

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
                        tasks={this.props.tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.isDone === true;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.isDone === false;
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
        addTask(todolistId, newTask,) {
            const action = addTaskAC(todolistId, newTask)
            dispatch(action)
        },
        changeTask: (todolistId, taskId, obj) => {
            const action = changeTaskAC(todolistId, taskId, obj)
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