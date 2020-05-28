import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, createNewTodoLists, getTodoLists} from "./reducer";
import api from "./api";
import Loading from "./common/Loading/Loading";


class App extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };

    restoreState = () => {
        this.props.getTodoLists();
    }

    addTodoList = (title) => {
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


const mapStateToProps = (state) => {
    return {
        todoLists: state.todoListPage.todolists,
        isWaitingTodo: state.todoListPage.isWaitingTodo
    }
}


const ConnectedApp = connect(mapStateToProps, {getTodoLists, createNewTodoLists})(App);
export default ConnectedApp;

