import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./Components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodoListsAC} from "./reducer";
import axios from 'axios'


class App extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    };

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodoLists(res.data);
            });
    }

    addTodoList = (title) => {
        axios.post( "https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
            })
                .then(responsive => {
                    let todolist = responsive.data.data.item;
                    this.props.addTodolist(todolist)
                })
    };



    // addTodoList = (newTodoListName) => {
    //     let newToDoList = {
    //         tasks: [],
    //         id: this.nextToDoListId,
    //         title: newTodoListName,
    //     };
    //     this.props.addTodolist(newToDoList)
    //     this.nextToDoListId++;
    // };


    render = () => {
        const toDoLists = this.props.todoLists.map(t => {
                return <ToDoList key={t.id}
                                 id={t.id}
                                 title={t.title}
                                 tasks={t.tasks}
                                 />
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
            debugger
            dispatch(setTodoListsAC(todolists))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

