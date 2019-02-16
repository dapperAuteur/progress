import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io.connect("http://localhost:5000");
  };

  render() {
    return (
      <div className="container">
        <h1>Progress tracker</h1>
      </div>
    );
  }
}

export default App;
