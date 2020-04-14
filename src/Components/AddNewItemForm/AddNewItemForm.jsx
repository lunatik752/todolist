import React from "react";
import PropTypes from 'prop-types';

class AddNewItemForm extends React.Component {

    state = {
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

    onFilterChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e) => {
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

AddNewItemForm.propTypes = {
    name: PropTypes.object
};