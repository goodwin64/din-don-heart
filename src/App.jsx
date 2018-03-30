import React from 'react';

import logo from './logo.svg';
import './App.css';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Din-Don ❤</h1>
        </header>
        <p className="motto">
          Everything you should know about your heart
        </p>
        <input type="file" id="filepicker" />
        <canvas id="outCanvas" />
      </div>
    );
  }
}

export default App;
