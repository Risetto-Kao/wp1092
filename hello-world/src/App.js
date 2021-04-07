import logo from './logo.svg';
import './App.css';
import Button from './component/Button.js'
import InputBox from './component/InputBox.js';
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello, world!</h1>
//     </div>
//   );
// }

import React, { Component } from 'react';




class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 100 };
    }

    handleInc = () => this.setState(
        state => ({ count: state.count + 1 })
    );
    handleInc2 = () => {
        this.setState(state => ({ count: state.count + 1 }));
        this.setState(state => ({ count: state.count + 1 }));
    }


    handleDec = () => this.setState(
        state => ({ count: state.count - 1 })
    );

    render() {
        return (
            <div className='App'>
                <h1 className='App-display'>
                    {this.state.count}
                </h1>
                <div className='App-controls'>
                    <span>
                        <Button text="+2" onClick = {this.handleInc2}/>
                        <Button text="+" onClick={this.handleInc} />
                        <Button text="-" onClick={this.handleDec} />
                    </span>
                </div>
            </div>
        );
    }

}




export default Counter;
