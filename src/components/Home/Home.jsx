import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2>Welcome</h2>
        <Link to="/progress" className="btn mr-1 btn-success">
          Create progress
        </Link>
        <Link to="/user" className="btn btn-primary">
          Enter progress
        </Link>
      </div>
    );
  }
}

export default Home;
