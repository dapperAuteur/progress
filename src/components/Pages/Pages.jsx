import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Login from '../Admin/Login/Login';
import Progress from '../Admin/Progress/Progress';
import StartProgress from '../Admin/StartProgress/StartProgress';
import User from '../User/User';
import UserStart from '../UserStart/UserStart';
import Done from '../Done/Done';
class Pages extends Component {
  state = {
    token: localStorage.getItem('token') || '',
    students: [
      { id: 1, username: 'Adam', status: '' },
      { id: 2, username: 'Anthony', status: '' },
      { id: 3, username: 'Avonlea', status: '' },
      { id: 4, username: 'Chandler', status: '' },
      { id: 5, username: 'Christian', status: '' },
      { id: 6, username: 'Esteban', status: '' },
      { id: 7, username: 'Jordan', status: '' },
      { id: 8, username: 'Krish', status: '' },
      { id: 9, username: 'Kyle', status: '' },
      { id: 10, username: 'Muhammad', status: '' },
      { id: 11, username: 'Madi', status: '' },
      { id: 12, username: 'Trent', status: '' }
    ],
    progressName: '',
    currentUser: {},
    start: false,
    error: ''
  };

  // Admin Submission
  // ===================
  handleAdminSubmit = e => {
    const { progressName } = e.target;

    const obj = {
      progressName: progressName.value,
      students: this.state.students
    };

    //Connect to socket server
    const socket = io.connect('https://maljuburi-progress.herokuapp.com');
    // Emit new admin data
    socket.emit('client-admin-data', obj);

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

    const socket = io.connect('https://maljuburi-progress.herokuapp.com');
    socket.emit('client-new-user', user);

    this.setState({
      currentUser: user
    });
  };

  handleStartUser = user => {
    const socket = io.connect('https://maljuburi-progress.herokuapp.com');
    socket.emit('client-start-user', user);

    this.setState({
      start: true
    });
  };

  handleDoneUser = (start, user) => {
    if (start === true) {
      const socket = io.connect('https://maljuburi-progress.herokuapp.com');
      socket.emit('client-end-user', user);
    }
  };

  render() {
    return (
      <Switch>
        {this.state.token && (
          <Route
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
        {this.state.token && (
          <Route
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
        )}

        <Route
          path="/user/start"
          exact
          render={props => (
            <UserStart
              currentUser={this.state.currentUser}
              handleStartUser={this.handleStartUser}
              handleDoneUser={this.handleDoneUser}
              start={this.state.start}
              error={this.state.error}
              {...props}
            />
          )}
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
        <Route path="/done" exact component={Done} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Pages;
