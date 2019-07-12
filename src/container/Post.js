import React, { Component } from 'react';
import { writeData } from '../utils/commonHelper';

class PostMessages extends Component {
  state = {
    username: 'Hello',
    comment: 'Test User'
  };

  _handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _handleSubmit = () => {
    const { username, comment } = this.state;
    if (username && comment) {
      // console.log('Submitttttt', this.state);
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        // console.log('====Inside check====');
        navigator.serviceWorker.ready.then(function(sw) {
          // console.log('====Inside check ready====');
          let post = {
            id: new Date().toISOString(),
            user: username,
            comment
          };
          writeData('sync-posts', post);
          // console.log('llllllllllll', sw);
          sw.sync
            .register('new-post')
            .then(function(res) {
              alert('Successfully registered data');
              // console.log('');
            })
            .catch(err => {
              console.log('Error', err);
            });
          // .then(function() {
          //   console.log('====Inside====');

          //   return sw.sync.register('new-post');
          // })
          // .then(function() {
          //   alert('Successfully registered data');
          // })
          // .catch(err => {
          //   console.log('====Error====', err);
          // });
        });
      } else {
        alert(
          'Hit Server api here if service worker or syncManager not support '
        );
      }
    } else {
      alert('Please fill valid data before post');
    }
  };

  render() {
    let { username, comment } = this.state;
    return (
      <div className="page_wrapper">
        <div className="container cstm_wrp">
          <form className="form-group">
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                className="form-control mrgn_btm"
                onChange={this._handleChange}
              />
            </div>
            <div>
              <label>Comment</label>
              <textarea
                name="comment"
                value={comment}
                rows="6"
                className="form-control mrgn_btm"
                onChange={this._handleChange}
              >
                {comment}
              </textarea>
            </div>
            <center>
              <button
                type="button"
                className="btn btn-info"
                onClick={this._handleSubmit}
              >
                Post
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}

export default PostMessages;
