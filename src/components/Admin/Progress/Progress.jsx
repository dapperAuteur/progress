import React, { Component } from 'react';

class Progress extends Component {
  handleAdminSubmit = e => {
    e.preventDefault();
    this.props.handleAdminSubmit(e);
    this.props.history.push('/progress/start');
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Today's Progress</h1>
        <hr />
        <form onSubmit={this.handleAdminSubmit} className="mb-4">
          <button type="submit" className="btn btn-primary btn-lg float-right">
            Start
          </button>
          <div className="clearfix" />
          <div className="form-group">
            <label htmlFor="progressName">Progress name</label>
            <input
              type="text"
              name="progressName"
              id="progressName"
              className="form-control"
              placeholder="Enter new progress"
              required
            />
          </div>

          <div>
            <div className="form-group">
              {this.props.students.map(student => {
                return (
                  <div key={student.id} className="form-group">
                    <label htmlFor={student.id}>
                      <small>
                        <strong>Student {student.id}</strong>
                      </small>
                    </label>
                    <input
                      required
                      disabled
                      id={student.id}
                      type="text"
                      name={student.username}
                      className="form-control"
                      value={student.username}
                      placeholder="Enter name"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Progress;
