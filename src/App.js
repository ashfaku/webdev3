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
    fetch("https://johnnylaicode.github.io/api/credits.json")
      .then(res => res.json())
      .then(credits => {
        const totalCredits = credits.reduce((sum, credit) => sum + credit.amount, 0);
        this.setState({
          creditList: credits,
          accountBalance: totalCredits.toFixed(2)  // Initially set balance to total credits
        });
      })
      .catch(error => console.log("Error fetching credits:", error));
  }

  addCredit = (newCredit) => {
    this.setState(prevState => {
      const updatedCredits = [...prevState.creditList, newCredit];
      const updatedBalance = (parseFloat(prevState.accountBalance) + parseFloat(newCredit.amount)).toFixed(2);
      return { creditList: updatedCredits, accountBalance: updatedBalance };
    });
  };

  //write a addDebit function, and do something similar to what I did with addCredit, and manipulate the State that held the JSON for the fetched Debit's API data
  mockLogIn = (logInInfo) => {  
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  render() {  
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={() => <Home accountBalance={this.state.accountBalance} />} />
          <Route exact path="/userProfile" render={() => <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />} />
          <Route exact path="/login" render={() => <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />} />
          <Route exact path="/credits" render={() => <Credits credits={this.state.creditList} addCredit={this.addCredit} />} />
          <Route exact path="/debits" render={() => <Debits debits={this.state.debitList} />} />
        </div>
      </Router>
    );
  }
}

export default App;
