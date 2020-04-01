import React from "react";

class TodoListTask extends React.Component {


    onIsDoneChanged = (e) => {this.changeStatus(this.props.task, e.currentTarget.checked)};

    render = () => {

        let taskIsDoneClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={taskIsDoneClass}>
                <input
                    type="checkbox"
                    checked={this.props.task.isDone}
                    onChange={this.onIsDoneChanged}
                />
                <span>{this.props.title}</span>
                <span>, priority: {this.props.priority}</span>
            </div>
        );
    }
}

export default TodoListTask;