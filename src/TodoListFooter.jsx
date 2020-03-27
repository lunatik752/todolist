import React from "react";

class TodoListFooter extends React.Component {
    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                <button
                    className={classForAll}
                    onClick={() => {
                        this.props.changeFilter("All")// создается стрелочная анонимная функция которая при нажитии на кнопку вызывает функцию  changeFilter
                    }}
                >All
                </button>
                <button
                    className={classForCompleted}
                    onClick={() => {
                        this.props.changeFilter("Completed")   // создается стрелочная анонимная функция которая при нажитии на кнопку вызывает функцию  changeFilter
                    }}
                >Completed
                </button>
                <button
                    className={classForActive}
                    onClick={() => {
                        this.props.changeFilter("Active")  // создается стрелочная анонимная функция которая при нажитии на кнопку вызывает функцию  changeFilter
                    }}
                >Active
                </button>
            </div>
        );
    }
}

export default TodoListFooter;

