import React from "react";
import PropTypes from 'prop-types';

class TodoListTitle extends React.Component {

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
            <div className="todoListTitle">
                <h3 className="todoList-header__title">{this.props.title}</h3>
            </div>
        );
    }
}

export default TodoListTitle;

TodoListTitle.propTypes = {
    name: PropTypes.object
};