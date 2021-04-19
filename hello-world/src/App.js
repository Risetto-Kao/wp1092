import React, { Component } from 'react'
import Table from './components/Table'
// import { BrowserRouter } from 'react-router-dom'

// import Blog from './containers/Blog/Blog'

class App extends Component {
  render() {
    return (
      // <BrowserRouter basename="/my-app">
      // <BrowserRouter>
      //   <div className="App">
      //     <Blog />
      //   </div>
      // </BrowserRouter>
      <>
        <header>clone sheet</header>
        <Table x={4} y={5}></Table>
      </>
    )
  }
}

export default App
