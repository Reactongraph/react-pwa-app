import React, { Component } from 'react';
import { Promise } from 'q';

class DeviceAccess extends Component {
  state = {
    document: '',
    location: ''
  };

  componentDidMount() {
    this._initializeMedia();
  }

  _initializeMedia = () => {
    if (!('mediaDevices' in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(
            new Error('get User Media is not implemented.')
          );
        }

        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(stream) {
        document.querySelector('#player').srcObject = stream;
        document.querySelector('#player').style.display = 'block';
      })
      .catch(err => {
        document.querySelector('#pick-image').style.display = 'block';
      });
  };

  _handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _handleSubmit = () => {
    console.log('-----Submitted-----');
  };
  render() {
    const { location, document } = this.state;
    return (
      <>
        <div id="create-post">
          <div id="video-canvas">
            <video id="player" autoPlay></video>
            <canvas is="canvas" width="320px" height="240px"></canvas>
          </div>

          <div id="btn-center">
            <button type="button" id="capture-btn">
              Capture
            </button>
          </div>
          <div id="pick-image">
            <h6>Pick an Image Instead</h6>
            <input
              type="file"
              name="document"
              value={document}
              accept="image/*"
              onChange={this._handleChange}
            />
          </div>
          <form id="form-capture" className="form-group">
            <div>
              <label>Location</label>
              <input
                name="location"
                value={location}
                onChange={this._handleChange}
                className="form-control"
              />
            </div>
            <div id="btn-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this._handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default DeviceAccess;
