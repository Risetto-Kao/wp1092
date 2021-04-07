import React, { Component } from "react";

class TodoInput extends Component {
  constructor(props){
    super(props);
    this.state  = {input: ''};

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(e){
    this.setState({input: e.target.value});
  }

  handleInputSubmit(e){
    this.props.onInputSubmit(this.state.input);
    this.setState({input: ''});
    e.preventDefault();
  }

  render() {
    return (
     <form onSubmit={this.handleInputSubmit}>
       <input className='todo-app__input' onChange={this.handleInputChange} placeholder='Add Something To Do...' value={this.state.input}></input>
     </form>
    );
  }
}

export default TodoInput;
