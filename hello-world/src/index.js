import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import ScoreCard from './App';



const columnIndex = ['Subject', 'score'];
const scoreCard = {
  name: 'Max',
  records: [
    ['Math', 100],
    ['Chinese', 87],
    ['English', 100],
    ['Science', 100],
    ['Social', 0]
  ]
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    return (
      <div>
        <h1>Hi</h1>
        <h2>It is{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


setInterval(()=>ReactDOM.render(<Clock />,
  document.getElementById('root')),1000);
  
// ReactDOM.render(<Clock />,
//   document.getElementById('root'));




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
