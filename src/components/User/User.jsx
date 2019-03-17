import React, { Component } from "react";

class User extends Component {
  handleNewUser = e => {
    e.preventDefault();
    const validUser = this.props.handleNewUser(e);
    if (validUser) {
      this.props.history.push("/user/start");
    }
  };

  render() {
    return (
      <div className="container">
        <h3 className="text-center">User page</h3>
        {this.props.error && (
          <p className="alert alert-danger">
            <small>{this.props.error}</small>
          </p>
        )}

        <form onSubmit={e => this.handleNewUser(e)}>
          <div className="form-group">
            <label htmlFor="username">Enter your name: </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="progressName">Enter progress name: </label>
            <input
              type="text"
              name="progressName"
              id="progressName"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enter
          </button>
        </form>
      </div>
    );
  }
}

export default User;
