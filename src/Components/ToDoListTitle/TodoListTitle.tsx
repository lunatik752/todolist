import React, { ChangeEvent } from "react";

type PropsType = {
    title: string
    changeTodoListTitle: (title: string) => void
}

type StateType = {
    title: string
    editMode: boolean
}


class TodoListTitle extends React.Component<PropsType> {

    state: StateType = {
        title: this.props.title,
        editMode: false,
    };


    activateEditMode = () => {
        this.setState({editMode: true})
    };

    deActivateEditMode = () => {
        this.props.changeTodoListTitle(this.state.title)
        this.setState({editMode: false})
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
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
