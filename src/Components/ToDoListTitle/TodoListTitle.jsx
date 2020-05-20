import React from "react";
import PropTypes from 'prop-types';

class TodoListTitle extends React.Component {

    state = {
        // error: false,
        title: this.props.title,
        editMode: false,
    };

    // onAddTaskClick = () => {
    //     let newTitle = this.state.title;
    //     this.setState({title: ""});
    //     if (newTitle === "") {
    //         this.setState({error: true})
    //     } else {
    //         this.setState({error: false});
    //         this.props.addTask(newTitle)
    //     }
    // };
    //
    // onFilterChange = (e) => {
    //     this.setState({
    //         error: false,
    //         title: e.currentTarget.value
    //     });
    // };
    //
    // onKeyPress = (e) => {
    //     if (e.key === "Enter") {
    //         this.onAddTaskClick()
    //     }
    // };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.props.changeTodoListTitle(this.state.title)
        this.setState({editMode: false})
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    render = () => {


        return (
            <div className="todoListTitle">
                {this.state.editMode ?
                    <input
                        value={this.state.title}
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        onChange={this.onTitleChanged}
                    /> :
                    <h3 onClick={this.activateEditMode} className="todoList-header__title">{this.state.title}</h3>
                }
            </div>
        );
    }
}

export default TodoListTitle;

TodoListTitle.propTypes = {
    name: PropTypes.object
};