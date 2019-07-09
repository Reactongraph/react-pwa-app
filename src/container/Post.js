import React, { Component } from 'react';

class PostMessages extends Component {
  state = {
    username: '',
    comment: ''
  };

  _handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _handleSubmit = () => {
    console.log('Submitttttt', this.state);
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
