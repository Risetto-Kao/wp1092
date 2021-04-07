import React, { Component } from "react";

class GenItem extends Component {
  constructor(props){
    super(props);
    this.state = {checked: false};
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }
  
  handleCheckClick(){
    this.setState((state) => ({
      checked: !state.checked
    }));

    if(this.state.checked === true)
      this.props.onCheckClick(this.props.id, 1);
    else
      this.props.onCheckClick(this.props.id, -1);
  }
    
  handleCancelClick(){
    if(this.state.checked === false)
      this.props.onCancelClick(this.props.id, -1);
    else
      this.props.onCancelClick(this.props.id, 0);
  }

  render(){
    const textCheckStyle = {textDecoration: "line-through", opacity: 0.5};
    let display = {};
    if(this.state.checked === false){
      if(this.props.viewOption === 'Completed') {
        display = {display: "None"};
      }
    }
    else{
      if(this.props.viewOption === 'Active') {
        display = {display: "None"};
      }
    }
    return(
      <li className="todo-app__item" style={display}>
        <div className="todo-app__checkbox">
          <input type="checkbox" id={this.props.id} onChange={this.handleCheckClick} defaultChecked={this.state.checked}></input>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1 className="todo-app__item-detail" style={this.state.checked? textCheckStyle:{}}>{this.props.value}</h1>
        <img src="./img/x.png" alt="cancel" className="todo-app__item-x" onClick={this.handleCancelClick}></img>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    const list = this.props.todoList;
    const listItems = list.map((value, index) =>       
      <GenItem key={index.toString()} id={index.toString()} value={value} viewOption={this.props.viewOption}
      onCheckClick={this.props.onCheckClick} onCancelClick={this.props.onCancelClick}/>
    );
    return (
      <ul className="todo-app__list" id="todo-list">
        {listItems}
      </ul>
    );
  }
}

export default TodoList;

