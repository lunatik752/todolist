import React from "react";

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task, status)
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.props.changeTitle(this.props.task, this.state.title)
        this.setState({editMode: false, editModePriority: false})
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value})
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }


    render = () => {
        let statusTask = this.props.task.status

        let taskIsDoneClass = statusTask === 2 ? "todoList-task done" : "todoList-task";

        let taskPriority = '';

        switch (this.props.priority) {
            case 0:
                taskPriority = 'Low';
                break
            case 1:
                taskPriority = 'Middle';
                break
            case 2:
                taskPriority = 'Hi';
                break
            case 3:
                taskPriority = 'Urgently';
                break
            case 4:
                taskPriority = 'Later';
                break
            default:
                taskPriority = 'not specified'
        }


        return (
            <div className={taskIsDoneClass}>
                <input
                    type="checkbox"
                    checked={statusTask === 2}
                    onChange={this.onIsDoneChanged}
                />
                <span>{this.props.task.id} - </span>
                {this.state.editMode ?
                    <input
                        value={this.state.title}
                        autoFocus={true}
                        onBlur={this.deActivateEditMode}
                        onChange={this.onTitleChanged}
                    /> :
                    <span onClick={this.activateEditMode}>{this.props.task.title}</span>
                }
                <span>, priority: {taskPriority}</span>
                <button onClick={this.deleteTask}>x</button>
            </div>
        );
    };
}

export default TodoListTask;