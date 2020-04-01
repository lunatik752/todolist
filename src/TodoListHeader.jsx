import React from "react";
import PropTypes from 'prop-types';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: "",
    };


    onAddTaskClick = () => {
        let newTitle = this.state.title;
        this.setState({title: ""});
        if (newTitle === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false});
            this.props.addTask(newTitle)
        }

    };

    onFilterChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });


    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick()
        }
    };


    render = () => {


        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        type="text" placeholder="New task name"
                        className={this.state.error ? "error" : ""}
                        onChange={this.onFilterChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
    name: PropTypes.object
};