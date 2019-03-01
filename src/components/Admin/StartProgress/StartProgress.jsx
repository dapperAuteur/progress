import React, { Component } from 'react';
import io from 'socket.io-client';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
class StartProgress extends Component {
  componentDidMount() {
    const apiURL = process.env.REACT_APP_API_URL;
    //Connect to socket server
    const socket = io.connect(apiURL);

    // Listen to admin data
    socket.on('server-update-data', data => {
      this.props.handleDataUpdate(data);
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          Progress name :{' '}
          <kbd className="ml-2 px-4 ">{this.props.progressName}</kbd>
        </h1>
        <hr />
        <h5 className="text-center">
          <kbd className="p-2 bg-light text-dark">
            {window.location.host}/user
          </kbd>
          <CopyToClipboard text={window.location.host + '/user'}>
            <button
              title="Copy to clipboard"
              className="btn btn-success shadow-sm btn-sm"
            >
              <FontAwesomeIcon icon={faClipboard} />
            </button>
          </CopyToClipboard>
        </h5>
        <hr />
        <div className="row">
          <div className="col-4">
            <p className=" alert text-white bg-dark shadow-sm">Entered</p>
          </div>
          <div className="col-4">
            <p className=" alert text-white bg-dark shadow-sm">In-process</p>
          </div>
          <div className="col-4">
            <p className=" alert text-white bg-dark shadow-sm">Done</p>
          </div>
        </div>
        {this.props.students.map(s => (
          <div key={s.id} className="row">
            <div className="col-4">
              <h6
                className={`alert shadow-sm text-${
                  s.status === 'entered' ||
                  s.status === 'in-process' ||
                  s.status === 'done'
                    ? 'light'
                    : 'dark'
                } dark bg-${
                  s.status === 'entered' ||
                  s.status === 'in-process' ||
                  s.status === 'done'
                    ? 'success'
                    : 'light'
                }`}
              >
                {s.username}
              </h6>
            </div>
            <div className="col-4">
              <p
                className={`alert shadow-sm text-${
                  s.status === 'in-process' || s.status === 'done'
                    ? 'light'
                    : 'muted'
                } dark bg-${
                  s.status === 'in-process' || s.status === 'done'
                    ? 'success'
                    : 'light'
                }`}
              >
                In-process
              </p>
            </div>
            <div className="col-4">
              <p
                className={`alert shadow-sm text-${
                  s.status === 'done' ? 'light' : 'muted'
                } dark bg-${s.status === 'done' ? 'success' : 'light'}`}
              >
                Done
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default StartProgress;
