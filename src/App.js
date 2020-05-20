import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodoListsAC} from "./reducer";
import api from "./api";


class App extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };

    restoreState = () => {
            api.getTodoList()
            .then(res => {
                this.props.setTodoLists(res.data);
            });
    }

    addTodoList = (title) => {
        api.createTodoList(title)
                .then(responsive => {
                    let todolist = responsive.data.data.item;
                    this.props.addTodolist(todolist)
                })
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
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {toDoLists}
                </div>
            </div>
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
            const action = addTodolistAC(newTodoList);
            dispatch(action)
        },
        setTodoLists: (todolists) => {
            dispatch(setTodoListsAC(todolists))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

