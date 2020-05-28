import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Components/ToDoListTitle/TodoListTitle";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {
    addNewTask,
    delTask,
    delTodoList,
    getTasks,
    updateTask,
    updateTodoListTitle
} from "./reducer";
import Loading from "./common/Loading/Loading";


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
        this.props.getTasks(this.props.id);
    }


    addTask = (newText) => {
        this.props.addNewTask(newText, this.props.id)
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
        this.props.updateTask(task, obj, this.props.id, task.id)
    };

    changeStatus = (task, status) => {
        this.changeTask(task, {status: status})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

    deleteTodoList = () => {
        this.props.delTodoList(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.delTask(this.props.id, taskId)
    }

    changeTodoListTitle = (title) => {
        this.props.updateTodoListTitle(this.props.id, title)
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
                    {this.props.isWaitingTask ?
                        <Loading/> :
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
                            })}/>}
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


const mapStateToProps = (state) => {
    return {
        isWaitingTask: state.todoListPage.isWaitingTask
    }
}


const ConnectedTodoList = connect(mapStateToProps, {
    addNewTask,
    updateTask,
    delTodoList,
    delTask,
    updateTodoListTitle,
    getTasks
})(ToDoList)
export default ConnectedTodoList;