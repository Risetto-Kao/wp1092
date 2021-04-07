import React, { Component } from "react";
import Header from "../containers/Header";
import Main from "../containers/Main"
import Footer from "../containers/Footer"

class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {leftNum: 0, totalNum: 0, viewOption: 'All', clearCompleted: 0};

    this.handleLeftNumChange = this.handleLeftNumChange.bind(this);
    this.handleTotalNumChange= this.handleTotalNumChange.bind(this);
    this.handleViewOptionChange= this.handleViewOptionChange.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleLeftNumChange(num){
    this.setState((state) => ({
      leftNum: state.leftNum + num
    }));
  }

  handleTotalNumChange(num){
    this.setState((state) => ({
      totalNum: state.totalNum + num
    }));
  }

  handleViewOptionChange(view){
    console.log(view);
    this.setState({viewOption: view});
  }

  handleClearCompleted(){
    this.setState((state) => ({
      clearCompleted: state.clearCompleted+1
    }));
  }

  render() {
    return (
      <>
        <Header /> 
        <Main clearCompleted={this.state.clearCompleted}
        onLeftNumChange={this.handleLeftNumChange} onTotalNumChange={this.handleTotalNumChange} viewOption={this.state.viewOption}/>
        <Footer leftNum={this.state.leftNum} totalNum={this.state.totalNum} 
        onViewOptionChange={this.handleViewOptionChange} onClearCompleted={this.handleClearCompleted}/>
        <p>{this.state.viewOption}</p>
      </>
    );
  }
}

export default TodoApp;
