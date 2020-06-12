import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {createNewTodoLists, getTodoLists} from "./reducer";
import Loading from "./common/Loading/Loading";
import {AppStateType} from './store';
import {TodoListType} from "./types/entities";


type MapDispatchToPropsType = {
    getTodoLists: () => void
    createNewTodoLists: (title: string) => void
}
type MapStateToPropsType = {
    todoLists: Array<TodoListType>
    isWaitingTodo: boolean
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<PropsType> {

    componentDidMount = () => {
        this.restoreState()
    };

    restoreState = () => {
        this.props.getTodoLists();
    }

    addTodoList = (title: string) => {
        this.props.createNewTodoLists(title);
    };


    render = () => {
        const toDoLists = this.props.todoLists.map(t => {
                return <ToDoList key={t.id}
                                 id={t.id}
                                 title={t.title}
                                 tasks={t.tasks}/>
            }
        );

        return (
            <div className='app_wrapper'>
                {this.props.isWaitingTodo
                    ? <Loading/>
                    : <>
                        <div>
                            <AddNewItemForm addItem={this.addTodoList}/>
                        </div>
                        <div className="App">
                            {toDoLists}
                        </div>
                    </>}
            </div>
        );
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todoLists: state.todoListPage.todoLists,
        isWaitingTodo: state.todoListPage.isWaitingTodo
    }
}


const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getTodoLists,
    createNewTodoLists
})(App);
export default ConnectedApp;

