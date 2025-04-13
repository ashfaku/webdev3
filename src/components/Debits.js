// Debits.js

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDebit = {
      id: Math.random(),
      description,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toISOString().split("T")[0],
    };
    props.addDebit(newDebit);
    setDescription('');
    setAmount('');
  };

  const debitsView = () => {
    return props.debits.map((debit) => {
      const date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          {debit.amount} - {debit.description} - {date}
        </li>
      );
    });
  };

  return (
    <div className="container">
      <h1>Debits</h1>

      <ul>{debitsView()}</ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          required
        />
        <button type="submit">Add Debit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
