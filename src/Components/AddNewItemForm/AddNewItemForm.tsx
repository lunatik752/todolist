import React, {ChangeEvent, KeyboardEvent} from "react";


type StateType = {
    error: boolean
    title: string
}

type  OwnPropsType = {
    addItem: (title: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {


    state: StateType = {
        error: false,
        title: "",
    };


    onAddItemClick = () => {
        let newTitle = this.state.title;
        this.setState({title: ""});
        if (newTitle === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false});
            this.props.addItem(newTitle)
        }
    };

    onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    };


    render = () => {


        return (
                <div className="addNewItemForm">
                    <input
                        type="text" placeholder="New item name"
                        className={this.state.error ? "error" : ""}
                        onChange={this.onFilterChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.title}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
        );
    }
}

export default AddNewItemForm;
