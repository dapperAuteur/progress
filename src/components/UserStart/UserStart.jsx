import React, { Component } from 'react';
class UserStart extends Component {
  handleDoneUser = (start, user) => {
    this.props.handleDoneUser(start, user);
    this.props.history.push('/done');
  };

  render() {
    const user = this.props.currentUser;

    return (
      <div className="container">
        <h1 className="text-center">Start</h1>
        <hr />
        <h3>{user.username}</h3>
        <h3>{user.progressName}</h3>
        {!this.props.start ? (
          <button
            onClick={() => this.props.handleStartUser(user)}
            className="btn btn-primary"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => this.handleDoneUser(this.props.start, user)}
            className="btn btn-success"
          >
            Done
          </button>
        )}
      </div>
    );
  }
}

export default UserStart;
