import React from "react";
import TodoListTask from "./Components/TodoListTasks/TodoListTask/TodoListTask";
import {TaskType} from "./types/entities";

type PropsType = {
    tasks: Array<TaskType>
    changeTitle: (taskId: string, title: string) => void
    changeStatus: (taskId: string, status: string) => void
    deleteTask: (taskId: string) => void
}

class TodoListTasks extends React.Component<PropsType> {


    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask
                key={task.id}
                changeTitle={this.props.changeTitle}
                changeStatus={this.props.changeStatus}
                task={task}


                deleteTask={this.props.deleteTask}
            />
        );

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;