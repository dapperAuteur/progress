import React, { Component } from 'react';
import { login } from '../../../services/login';
class Login extends Component {
  state = {
    err: null
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = e.target;
    const obj = {
      username: username.value,
      password: password.value
    };
    try {
      const { data } = await login(obj);
      localStorage.setItem('token', data.token);
      this.setState({ err: null });
      window.location = '/progress';
    } catch ({ response }) {
      const err = response.data;
      this.setState({ err });
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Admin Login</h1>
        <hr />
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.state.err && (
            <p className="alert alert-danger">
              <small>{this.state.err.message}</small>
            </p>
          )}
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
