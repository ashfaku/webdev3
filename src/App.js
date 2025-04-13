// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0.00,
      currentUser: {
        userName: 'JoeSmith123',
        memberSince: '07/23/96',
      },
      debitList: [],
      creditList: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("https://johnnylaicode.github.io/api/credits.json").then(res => res.json()),
      fetch("https://johnnylaicode.github.io/api/debits.json").then(res => res.json()),
    ])
    .then(([credits, debits]) => {
      const totalCredits = credits.reduce((acc, c) => acc + c.amount, 0);
      const totalDebits = debits.reduce((acc, d) => acc + d.amount, 0);
      const balance = (totalCredits - totalDebits).toFixed(2);
      this.setState({ creditList: credits, debitList: debits, accountBalance: balance });
    })
    .catch(console.error);
  }

  mockLogIn = (logInInfo) => {
    const updatedUser = { ...this.state.currentUser, userName: logInInfo.userName };
    this.setState({ currentUser: updatedUser });
  };

  addCredit = (credit) => {
    const newCredits = [...this.state.creditList, credit];
    const updatedBalance = parseFloat(this.state.accountBalance) + parseFloat(credit.amount);
    this.setState({ creditList: newCredits, accountBalance: updatedBalance.toFixed(2) });
  };

  addDebit = (debit) => {
    const newDebits = [...this.state.debitList, debit];
    const updatedBalance = parseFloat(this.state.accountBalance) - parseFloat(debit.amount);
    this.setState({ debitList: newDebits, accountBalance: updatedBalance.toFixed(2) });
  };

  render() {
    return (
      <Router basename="/webdev3">
        <div className="main-container">
          <img src={logo} alt="Bank of React logo" className="bank-logo" />
          <h1>Bank of React</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/userProfile">User Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/credits">Credits</Link>
            <Link to="/debits">Debits</Link>
          </nav>

          <Route exact path="/" render={() => (
            <Home accountBalance={this.state.accountBalance} />
          )} />
          <Route exact path="/userProfile" render={() => (
            <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
          )} />
          <Route exact path="/login" render={() => (
            <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
          )} />
          <Route exact path="/credits" render={() => (
            <Credits credits={this.state.creditList} addCredit={this.addCredit} />
          )} />
          <Route exact path="/debits" render={() => (
            <Debits debits={this.state.debitList} addDebit={this.addDebit} />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
