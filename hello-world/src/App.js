import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello, world!</h1>
//     </div>
//   );
// }

import React, { Component } from 'react';




class ScoreCard extends Component {
    render() {
        let records = this.props.scoreCard.records.map(e => e.map(g => <td>{g}</td>));

        return (
            <table>
                <caption>{this.props.scoreCard.name}'s Score </caption>
                <thead>
                    <tr>
                        {this.props.columnIndex.map(e => <th>{e}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {records.map(e => <tr>{e}</tr>)}

                </tbody>
            </table>
        );
    }
}



export default ScoreCard;
