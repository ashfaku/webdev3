import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("https://johnnylaicode.github.io/api/credits.json").then(res => res.json()),
      fetch("https://johnnylaicode.github.io/api/debits.json").then(res => res.json())
    ])
    .then(([credits, debits]) => {
      const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
      const totalDebits = debits.reduce((sum, debit) => sum + debit.amount, 0);
      this.setState(prevState => ({
        creditList: credits,
        debitList: debits,
        accountBalance: (prevState.accountBalance + totalCredits - totalDebits).toFixed(2),
      }));
    })
    .catch(error => console.log("Error fetching data:", error));
  }

  addCredit = (newCredit) => {
    this.setState(prevState => {
      const updatedCredits = [...prevState.creditList, newCredit];
      const updatedBalance = parseFloat(prevState.accountBalance) + parseFloat(newCredit.amount);
      return { creditList: updatedCredits, accountBalance: updatedBalance };
    });
  };
  
  addDebit = (newDebit) => { 
    this.setState(prevState => {
      const updatedDebits = [...prevState.debitList, newDebit];
      const updatedBalance = parseFloat(prevState.accountBalance) - parseFloat(newDebit.amount);
      return { debitList: updatedDebits, accountBalance: updatedBalance };
    });
  }

  mockLogIn = (logInInfo) => {  
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  render() {  
    return (
      <Router basename="/webdev3">
        <div>
          <Route exact path="/" render={() => <Home accountBalance={this.state.accountBalance} />} />
          <Route exact path="/userProfile" render={() => <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />} />
          <Route exact path="/login" render={() => <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />} />
          <Route exact path="/credits" render={() => <Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>} />
          <Route exact path="/debits" render={() => <Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />} />
        </div>
      </Router>
    );
  }
}

export default App;
