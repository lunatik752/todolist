import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from 'prop-types';



class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    };

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: 'All',
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach( task => {
                if(task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1;
                }
            })
        });
    };

    clearState = () => {
        localStorage.clear();
        this.restoreState();
    };


    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: true,
            priority: 'low'
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        },() =>{this.saveState();});
    };


    changeFilter = (newFilterValue) => {
        this.setState({
                filterValue: newFilterValue
            },() =>{this.saveState();}
        );
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        });
        this.setState({
            tasks: newTasks
        }, () => {this.saveState();});
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
};


    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks
                        changeTitle={this.changeTitle}
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
                        clearState={this.clearState}
                    />
                </div>
            </div>
        );
    }
}

export default App;


