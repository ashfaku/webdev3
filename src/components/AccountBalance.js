// AccountBalance.js

import React, { Component } from 'react';

class AccountBalance extends Component {
  render() {
    return (
      <div className="balance-box">
        Balance: ${this.props.accountBalance}
      </div>
    );
  }
}

export default AccountBalance;
