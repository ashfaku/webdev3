// UserProfile.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
      <div className="container">
        <h1>User Profile</h1>

        <div><strong>Username:</strong> {this.props.userName}</div>
        <div><strong>Member Since:</strong> {this.props.memberSince}</div>

        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default UserProfile;
