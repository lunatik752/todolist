import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from 'prop-types';
import TodoListTask from "./Components/TodoListTasks/TodoListTask/TodoListTask";


class App extends React.Component {
    constructor(props) {
        super(props);
        // this.newTaskTitleRef = React.createRef();
        //
    }

    state = {
        tasks: [
            {title: 'JS', isDone: true, priority: 'higt'},
            {title: 'HTML', isDone: true, priority: 'low'},
            {title: 'CSS', isDone: true, priority: 'low'},
            {title: 'React', isDone: false, priority: 'higt'},
        ],
        filterValue: 'All',
    };

    addTask = (newTitle) => {
        let newTask = {
            title: newTitle,
            isDone: true,
            priority: 'low'
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        })
    };

    // onAddTaskClick = () => {
    //
    //     let newText = this.newTaskTitleRef.current.value;
    //     this.newTaskTitleRef.current.value = '';   // очищает инпут после добавления новой таски
    //     let newTask = {
    //         title: newText,
    //         isDone: true,
    //         priority: 'low'
    //     };
    //     let newTasks = [...this.state.tasks, newTask];
    //     this.setState({
    //         tasks: newTasks
    //     })

    // };

    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue
            }
        )
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t !== task) {
                return t;
            } else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({
            tasks: newTasks
        })
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
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
                    />
                </div>
            </div>
        );
    }
}

export default App;


