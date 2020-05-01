import React from "react";

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.setState({editMode: false})
    };

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }


    render = () => {

        let taskIsDoneClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={taskIsDoneClass}>
                <input
                    type="checkbox"
                    checked={this.props.task.isDone}
                    onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.id} - </span>
                {this.state.editMode ?
                    <input
                        value={this.props.task.title}
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        onChange={this.onTitleChanged}
                    /> :
                    <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                }
                <span>, priority: {this.props.priority}</span>
                <button onClick={this.deleteTask}>x</button>
            </div>
        );
    };
}

export default TodoListTask;