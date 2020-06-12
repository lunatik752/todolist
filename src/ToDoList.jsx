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
        filterValue: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
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

    changeTask = (taskId, obj) => {
        debugger
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj};
        this.props.updateTask(task.id, this.props.id, task)
    };



    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
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