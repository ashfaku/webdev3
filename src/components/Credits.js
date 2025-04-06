import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Credits = (props) => {

  useEffect(() => {
    document.title = "Credits";
  }, []); 

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCredit = {
      id: Math.random(),
      description,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toISOString()//.split("T")[0],
    };
    props.addCredit(newCredit);
    setDescription("");
    setAmount("");
  };

  return (
    <div>
      <h1>Credits</h1>
      <ul>
        {props.credits.map((credit) => (
          <li key={credit.id}>{credit.amount} - {credit.description} - {credit.date}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" step="0.01" required />
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
