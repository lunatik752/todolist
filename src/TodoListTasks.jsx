import React from "react";
import TodoListTask from "./Components/TodoListTasks/TodoListTask/TodoListTask";

class TodoListTasks extends React.Component {


    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask
                changeTitle={this.props.changeTitle}
                changeStatus={this.props.changeStatus}
                task={task}
                title={task.title}
                isDone={task.isDone}
                priority={task.priority}
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