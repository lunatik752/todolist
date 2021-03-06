import React, {ChangeEvent} from "react";
import {TaskType} from "../../../types/entities";


type PropsType = {
    task: TaskType
    changeStatus: (taskId: string, status: number) => void
    changeTitle: (taskId: string, title: string) => void
    deleteTask: (taskId: string) => void

}

type StateType = {
    editMode: boolean
    title: string
}

class TodoListTask extends React.Component<PropsType> {
    state: StateType = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status)
    };

    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
        this.setState({editMode: false})
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }


    render = () => {
        let statusTask = this.props.task.status

        let taskIsDoneClass = statusTask === 2 ? "todoList-task done" : "todoList-task";

        let taskPriority = '';

        switch (this.props.task.priority) {
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