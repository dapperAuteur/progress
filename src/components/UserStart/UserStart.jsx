import React, { Component } from "react";
import classes from "./UserStart.module.css";
class UserStart extends Component {
  handleDoneUser = (start, user) => {
    this.props.handleDoneUser(start, user);
    // this.props.history.push("/done");
  };

  render() {
    const user = this.props.currentUser;

    return (
      <div className="container">
        <div className="row">
          <div className="col-6 text-center">
            Name<h5 className="text-primary"> {user.username}</h5>
          </div>
          <div className="col-6 text-center">
            Progress name
            <h5 className="text-primary">{user.progressName}</h5>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-6">
              {!this.props.start ? (
                <div
                  onClick={() => this.props.handleStartUser(user)}
                  className={classes.startBtn}
                >
                  <h3>START</h3>
                </div>
              ) : (
                <div className={classes.disabledBtn}>
                  <h3>START</h3>
                </div>
              )}
            </div>
            <div className="col-6">
              {this.props.start ? (
                <div
                  onClick={() => this.handleDoneUser(this.props.start, user)}
                  className={classes.doneBtn}
                >
                  <h3>Done</h3>
                </div>
              ) : (
                <div className={classes.disabledBtn}>
                  <h3>Done</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {!this.props.start ? (
          <div
            onClick={() => this.props.handleStartUser(user)}
            className={classes.startBtn}
          >
            <h3>START</h3>
          </div>
        ) : (
          <div
            onClick={() => this.handleDoneUser(this.props.start, user)}
            className={classes.doneBtn}
          >
            <h3>DONE</h3>
          </div>
        )} */}
      </div>
    );
  }
}

export default UserStart;
