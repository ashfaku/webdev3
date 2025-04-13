// Home.js

import React, { Component } from 'react';
import AccountBalance from './AccountBalance';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Bank of React</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Home;
