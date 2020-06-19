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
import {TaskType, UpdateTaskType} from "./types/entities";
import {AppStateType} from "./store";


type MapStateToPropsType = {
    isWaitingTask: boolean
}

type MapDispatchToPropsType = {
    addNewTask: (newText: string, todoListId: string) => void
    updateTask: (taskId: string, todoListId: string, task: TaskType) => void  //need to fix type any of task
    delTodoList: (odoListId: string) => void
    delTask: (todoListId: string, taskId: string,) => void
    updateTodoListTitle: (todoListId: string, title: string) => void
    getTasks: (todoListId: string) => void
}

type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
}

type StateType = {
    filterValue: string
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

class ToDoList extends React.Component<PropsType> {

    componentDidMount = () => {
        this.restoreState()
    };


    state: StateType = {
        filterValue: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    };

    restoreState = () => {
        this.props.getTasks(this.props.id);
    }


    addTask = (newText: string) => {
        this.props.addNewTask(newText, this.props.id)
    };


    changeFilter = (newFilterValue: string) => {
        this.setState({
                filterValue: newFilterValue
            }, () => {
                this.saveState();
            }
        );
    };

    changeTask = (taskId: string, obj: UpdateTaskType) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId
        });
        let task = {...changedTask, ...obj} as TaskType;
        this.props.updateTask(taskId, this.props.id, task)
    };


    changeStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId: string, title: string) => {
        this.changeTask(taskId, {title: title})
    };

    deleteTodoList = () => {
        this.props.delTodoList(this.props.id)
    }

    deleteTask = (taskId: string) => {
        this.props.delTask(this.props.id, taskId)
    }

    changeTodoListTitle = (title: string) => {
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
                    />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isWaitingTask: state.todoListPage.isWaitingTask
    }
}


const ConnectedTodoList = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    addNewTask,
    updateTask,
    delTodoList,
    delTask,
    updateTodoListTitle,
    getTasks
})(ToDoList)
export default ConnectedTodoList;