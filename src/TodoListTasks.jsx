import React from "react";
import TodoListTask from "./Components/TodoListTasks/TodoListTask/TodoListTask";
import ToDoList from "./ToDoList";

class TodoListTasks extends React.Component {


    render = () => {
        let tasksElements = this.props.tasks.map(task => <TodoListTask
                key={task.id}
                changeTitle={this.props.changeTitle}
                changeStatus={this.props.changeStatus}
                task={task}
                title={task.title}
                isDone={task.isDone}
                priority={task.priority}
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