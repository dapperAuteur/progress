import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import io from "socket.io-client";
import Login from "../Admin/Login/Login";
import Home from "../Home/Home";
import Progress from "../Admin/Progress/Progress";
import StartProgress from "../Admin/StartProgress/StartProgress";
import User from "../User/User";
import UserStart from "../UserStart/UserStart";
import ProtectedRoute from "../utils/ProjectedRoute/ProtectedRoute";
class Pages extends Component {
  state = {
    token: localStorage.getItem("token") || null,
    students: [
      { id: 1, username: "Adam", status: "" },
      { id: 2, username: "Anthony", status: "" },
      { id: 3, username: "Avonlea", status: "" },
      { id: 4, username: "Chandler", status: "" },
      { id: 5, username: "Christian", status: "" },
      { id: 6, username: "Esteban", status: "" },
      { id: 7, username: "Jordan", status: "" },
      { id: 8, username: "Krish", status: "" },
      { id: 9, username: "Kyle", status: "" },
      { id: 10, username: "Muhammad", status: "" },
      { id: 11, username: "Madi", status: "" },
      { id: 12, username: "Trent", status: "" }
    ],
    progressName: null,
    apiUrl: process.env.REACT_APP_API_URL,
    currentUser: null,
    start: false,
    error: ""
  };

  componentDidMount() {
    const socket = io.connect(this.state.apiUrl);

    socket.on("get-users", users => {
      if (users) {
        this.setState({ progressName: users.progressName });
      }
    });
  }

  // Admin Submission
  // ===================
  handleAdminSubmit = e => {
    const { progressName } = e.target;

    const obj = {
      progressName: progressName.value,
      students: this.state.students
    };

    //Connect to socket server
    const socket = io.connect(this.state.apiUrl);
    // Emit new admin data
    socket.emit("client-admin-data", obj);

    this.setState({
      progressName: progressName.value
    });
  };

  // Handle Data Update
  // =================
  handleDataUpdate = ({ students }) => {
    this.setState({
      students
    });
  };

  // Handle New user
  handleNewUser = e => {
    const { username, progressName } = e.target;
    const user = {
      username: username.value,
      progressName: progressName.value
    };

    const socket = io.connect(this.state.apiUrl);

    const validUser = this.state.students.filter(s => {
      if (
        s.username === user.username &&
        this.state.progressName === user.progressName
      ) {
        return true;
      }
      return false;
    });

    if (validUser.length > 0) {
      socket.emit("client-new-user", user);

      this.setState({
        currentUser: user,
        error: null
      });

      return true;
    } else {
      this.setState({
        error: "Invalid username or progress name"
      });
      return false;
    }
  };

  handleStartUser = user => {
    const socket = io.connect(this.state.apiUrl);
    socket.emit("client-start-user", user);

    this.setState({
      start: true
    });
  };

  handleDoneUser = (start, user) => {
    if (start === true) {
      const socket = io.connect(this.state.apiUrl);
      socket.emit("client-end-user", user);
    }

    this.setState({
      start: false
    });
  };

  render() {
    return (
      <Switch>
        {this.state.progressName && (
          <ProtectedRoute
            path="/progress/start"
            exact
            render={props => (
              <StartProgress
                students={this.state.students}
                progressName={this.state.progressName}
                handleDataUpdate={this.handleDataUpdate}
                {...props}
              />
            )}
          />
        )}

        <ProtectedRoute
          path="/progress"
          exact
          render={props => (
            <Progress
              students={this.state.students}
              handleAdminSubmit={this.handleAdminSubmit}
              {...props}
            />
          )}
        />

        <Route
          path="/user/start"
          exact
          render={props => {
            if (!this.state.currentUser && !this.state.progressName) {
              return <Redirect to="/user" />;
            }
            return (
              <UserStart
                currentUser={this.state.currentUser}
                handleStartUser={this.handleStartUser}
                handleDoneUser={this.handleDoneUser}
                start={this.state.start}
                error={this.state.error}
                {...props}
              />
            );
          }}
        />

        <Route
          path="/user"
          exact
          render={props => (
            <User
              handleNewUser={this.handleNewUser}
              error={this.state.error}
              {...props}
            />
          )}
        />

        {!this.state.token && <Route path="/login" exact component={Login} />}

        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Pages;
