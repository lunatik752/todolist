import React from 'react';
import './App.css';

import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };

    state = {
        toDoLists: []
    };
    nextToDoListId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todoLists-state', stateAsString)
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoLists-state');
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.toDoLists.forEach(toDoList => {
                if (toDoList.id >= this.nextToDoListId) {
                    this.nextToDoListId = toDoList.id + 1;
                }
            })
        });
    };


    addTodoList = (newTodoListName) => {
        let newToDoList = {
            tasks: [],
            id: this.nextToDoListId,
            title: newTodoListName,
        };
        this.props.addTodolist(newToDoList)
        this.nextToDoListId++;
    };


    render = () => {
debugger
        const toDoLists = this.props.todoLists.map(t => {
                return <ToDoList key={t.id}
                                 id={t.id}
                                 title={t.title}
                                 tasks={t.tasks}
                                 />
            }
        );

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {toDoLists}
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        todoLists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodoList) => {
            const action = {
                type: "ADD-TODOLIST",
                newTodoList: newTodoList
            };
            dispatch(action)
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

