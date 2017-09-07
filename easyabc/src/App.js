import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EasyABC from './EasyABC'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="game">
            <h1>Easy ABC</h1>
        </div>
        <EasyABC/>
      </div>
    );
  }
}

export default App;
