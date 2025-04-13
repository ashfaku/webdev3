import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Credits = (props) => {

  useEffect(() => {
    document.title = "Credits";
  }, []); 

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const submitCredit = (event) => {
    event.preventDefault();
    const newCredit = {
      id: props.credits.length + 1,
      description,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toISOString(),
    };
    props.addCredit(newCredit);
    setDescription("");
    setAmount("");
  };

  return (
    <div>
      <h1>Credits</h1>
      <div>Account Balance: {props.accountBalance}</div>
      <ul>
        {props.credits.map((credit) => (
          <li style={{listStyleType: 'none'}} key={credit.id}>{credit.amount} - {credit.description} - {credit.date.split("T")[0]}</li>
        ))}
      </ul>
      <form onSubmit={submitCredit}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" required />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" step="0.01" required />
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
