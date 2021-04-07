import React, { Component } from "react";
import TodoInput from "../components/TodoInput"
import TodoList from "../components/TodoList"


class Main extends Component { 
  constructor(props){
    super(props);
    this.state = {todoList: [], todoNum: 0, clearCompletedPrev: 1, checkedList: []};

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleCancelClick= this.handleCancelClick.bind(this);
  }

  handleInputSubmit(newTodo){
    let newTodoList = this.state.todoList;
    newTodoList[this.state.todoNum] = newTodo;
    this.props.onLeftNumChange(1);
    this.props.onTotalNumChange(1);
    this.setState({todoList: newTodoList});
    this.setState((state) => ({
      todoNum: state.todoNum + 1
    }));
  }
  
  handleCheckClick(id, num){
    this.props.onLeftNumChange(num);
    let tmpCheckList = this.state.checkedList;
    tmpCheckList.push(id);
    this.setState({checkedList: tmpCheckList});
  }

  handleCancelClick(id, num){
    this.props.onLeftNumChange(num);
    this.props.onTotalNumChange(-1);
    const tmpTodoList = this.state.todoList;
    delete tmpTodoList[id];
    this.setState({todoList: tmpTodoList});
    console.log(this.state.todoList);
    console.log(this.state.todoList.length);
  }
  
  clearCompleted(){
    let d = 0;
    for (const i of this.state.checkedList){
      console.log(this.state.todoList[i]);
      const tmpTodoList = this.state.todoList;
      if(tmpTodoList[i] !== undefined){
        d++;
        console.log('here');
      }
      delete tmpTodoList[i];
      this.setState({todoList: tmpTodoList});
    }
    this.props.onTotalNumChange(-d);
    this.setState({checkedList: []});
  }

  render(){
    if(this.props.clearCompleted === this.state.clearCompletedPrev){
      this.clearCompleted();
      this.setState((state) => ({
        clearCompletedPrev: state.clearCompletedPrev+1
      }));
    }
    return (
      <section className="todo-app__main">
        <TodoInput onInputSubmit={this.handleInputSubmit}/>
        <TodoList todoList={this.state.todoList} clearCompleted={this.props.clearCompleted}
        onCheckClick={this.handleCheckClick} onCancelClick={this.handleCancelClick} viewOption={this.props.viewOption}/>
      </section>
    );
  }
}

export default Main;
