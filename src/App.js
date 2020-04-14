import React from 'react';
import './App.css';

import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";


class App extends React.Component {

    componentDidMount() {
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
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.toDoLists.forEach( toDoList => {
                if(toDoList.id >= this.nextToDoListId) {
                    this.nextToDoListId = toDoList.id + 1;
                }
            })
        });
    };


    addTodoList = (newTodoListName) => {
        let newToDoList = {
            id: this.nextToDoListId,
            title: newTodoListName,

        };
        this.nextToDoListId++;
        this.setState({toDoLists: [...this.state.toDoLists, newToDoList],
        }, this.saveState);
    };


    render = () => {

        const toDoLists = this.state.toDoLists.map(t => {
            return  <ToDoList key={t.id} id={t.id} title={t.title}/>}
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

export default App;