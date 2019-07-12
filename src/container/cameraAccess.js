import React, { Component } from 'react';
import { Promise } from 'q';
import { dataURItoBlob } from '../utils/commonHelper';

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

    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      // console.log('-------------success--------');
      document.querySelector('#player').srcObject = stream;
      document.querySelector('#player').style.display = 'block';
      document.querySelector('#video-canvas').style.display = 'block';
    });
    // .catch(err => {
    //   console.log('-------------Error----------');
    //   // document.querySelector('#pick-image').style.display = 'block';
    // });
  };

  componentWillUnmount() {
    document.querySelector('#player').style.display = 'none';
    document.querySelector('#pick-image').style.display = 'none';
  }

  _handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _handleSubmit = () => {
    console.log('-----Submitted-----');
    let canvasElement = document.querySelector('#canvas');
    let videoPlayer = document.querySelector('#player');
    let captureButton = document.querySelector('#capture-btn');
    // console.log('-------Canvas-------', canvasElement);
    // console.log('-------Video-------', videoPlayer);
    // console.log('-------captureButton-------', captureButton);

    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('#player').style.display = 'none';
    document.querySelector('#capture-btn').style.display = 'none';

    let context = canvasElement.getContext('2d');
    context.drawImage(
      videoPlayer,
      0,
      0,
      canvasElement.width,
      videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width)
    );

    videoPlayer.srcObject.getVideoTracks().forEach(function(track) {
      track.stop();
    });
    // console.log('aaaaaaaaaaaaa', canvasElement.toDataURL());

    let picture = dataURItoBlob(canvasElement.toDataURL());
    // console.log('ppppppppppppppp', picture);
  };
  render() {
    const { location, document } = this.state;
    return (
      <>
        <div id="create-post">
          <div id="video-canvas">
            <video id="player" autoPlay></video>
            <canvas id="canvas" width="320px" height="240px"></canvas>
          </div>

          <div id="btn-center">
            <button type="button" id="capture-btn" onClick={this._handleSubmit}>
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
                onClick={() => {
                  console.log('submitted');
                }}
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
