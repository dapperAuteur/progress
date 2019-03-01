import React, { Component } from "react";
import { Link } from "react-router-dom";
class Index extends Component {
  render() {
    return (
      <div className="container">
        <h2>Progress App</h2>

        <form>
          <div className="form-group">
            <label>Select an option</label>
            <select
              onChange={e => this.props.handleSubmit(e)}
              name="userType"
              value={this.props.option}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {this.props.err && (
            <p className="alert alert-danger">
              <small>{this.props.err.message}</small>
            </p>
          )}

          {this.props.option !== "" && (
            <Link to={`/${this.props.option}`} className="btn btn-primary">
              Next
            </Link>
          )}
        </form>
      </div>
    );
  }
}

export default Index;
