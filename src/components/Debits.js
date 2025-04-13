/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import { useEffect } from "react";


const Debits = (props) => {
  useEffect(() => {
    document.title = "Debits";
  }, []); 

  const submitDebit = (event) => {
    event.preventDefault();
    const newDebit = {
      id: props.debits.length + 1,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value).toFixed(2),
      date: new Date().toISOString()
    };
    props.addDebit(newDebit);
  };

  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    console.log(debits);
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li style={{listStyleType: 'none'}} key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <div>Account Balance: {props.accountBalance}</div>
      <ul>{debitsView()}</ul>

      <form onSubmit={submitDebit}>
        <input placeholder="Enter description" type="text" name="description" required />
        <input placeholder="Enter amount" type="number" name="amount" required />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;