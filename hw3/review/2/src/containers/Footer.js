import React, {Component} from "react";

class Footer extends Component{
  constructor(props){
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleViewClick(e){
    this.props.onViewOptionChange(e.target.innerText);
  }

  render() {
    if(this.props.totalNum === 0) return null;
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">
          {this.props.leftNum} left
        </div>
        <ul className="todo-app__view-buttons">
          <button onClick={this.handleViewClick}>All</button>
          <button onClick={this.handleViewClick}>Active</button>
          <button onClick={this.handleViewClick}>Completed</button>
        </ul>
        <div className="todo-app__clean" style={this.props.totalNum - this.props.leftNum > 0? {}:{visibility: "hidden"}}>
          <button onClick={this.props.onClearCompleted}>Clear Completed</button>
        </div>
      </footer>
    );
  }
}

export default Footer;
