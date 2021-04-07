import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskToShow: "All",
            input: ""
        }
    }

    render() {
        let tasks = [];

        if (this.state.taskToShow === "All") {
            tasks = this.state.tasks;
        } else if (this.state.taskToShow === "Active") {
            tasks = this.state.tasks.filter(task => !task.complete);
        } else if (this.state.taskToShow === "Completed") {
            tasks = this.state.tasks.filter(task => task.complete);
        }



        return (
            <>
                <Header text="todos" />

                <section className="todo-app__main">

                    <input
                        className="todo-app__input"
                        onKeyPress={this.inputKeyPress}
                        onChange={this.handleChange}
                        value={this.state.input}
                        placeholder="What needs to be done?"></input>

                    <ul className="todo-app__list" id="todo-list">
                        {tasks.map((task) =>
                            <li className="todo-app__item" key={task.id}>

                                <div className="todo-app__checkbox">
                                    <input type="checkbox" id={task.id}></input>
                                    <label
                                        onClick={() => this.toggleComplete(task.id)}
                                        style={{
                                            background: task.complete ? "#26ca299b" : "rgba(99, 99, 99, 0.698)"
                                        }}
                                        for={task.id}
                                    >
                                    </label>
                                </div>

                                <h1
                                    style={{
                                        textDecoration: task.complete ? "line-through" : "",
                                        opacity: task.complete ? "0.5" : ""
                                    }}
                                    className="todo-app__item-detail"
                                >
                                    {task.input}
                                </h1>

                                <img
                                    onClick={() => this.deleteTask(task.id)}
                                    src="./img/x.png"
                                    className="todo-app__item-x"
                                    alt="" />
                            </li>
                        )}
                    </ul>

                </section>

                <footer
                    style={{
                        display: this.state.tasks.length === 0 ? "none" : ""
                    }}
                    className="todo-app__footer" id="todo-footer"
                >
                    <div className="todo-app__total">{this.state.tasks.filter(task => !task.complete).length} left</div>
                    <ul className="todo-app__view-buttons">
                        <button onClick={() => this.updateTaskToShow("All")}>All</button>
                        <button onClick={() => this.updateTaskToShow("Active")}>Active</button>
                        <button onClick={() => this.updateTaskToShow("Completed")}>Completed</button>
                    </ul>

                    <div className="todo-app__clean">
                        {this.state.tasks.filter(task => task.complete).length ? (
                            <button onClick={this.clearCompleted}>Clear completed</button>
                        ) : null}
                        
                        
                    </div>


                </footer>
            </>
        );
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    inputKeyPress = (event) => {
        if (event.key === "Enter") {
            this.addTask({
                id: Math.floor(Math.random() * 10000),
                input: this.state.input,
                complete: false
            });
        }
    }

    deleteTask = (id) => {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    clearCompleted = () => {
        this.setState({
            tasks: this.state.tasks.filter(task => !task.complete)
        });
    }

    addTask = (task) => {
        this.setState(state => ({
            tasks: [...state.tasks, task],
            input: ""
        }));
    }

    toggleComplete = (id) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        complete: !task.complete
                    };
                } else {
                    return task;
                }
            })
        });
    }

    updateTaskToShow = (showOption) => {
        this.setState({
            taskToShow: showOption
        });
    }



}

export default TodoApp;
