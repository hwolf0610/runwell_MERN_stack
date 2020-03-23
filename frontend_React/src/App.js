import React from 'react';
import Routes from './Routes';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    localStorage.setItem("url", "");
    // localStorage.setItem("url", "http://localhost:3000");
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
