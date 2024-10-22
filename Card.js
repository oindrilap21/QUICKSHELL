import React from "react";

const Card = ({ ticket }) => (
  <div className="card">
    <h3>{ticket.title}</h3>
    <p>Priority: {ticket.priority}</p>
    <p>Status: {ticket.status}</p>
  </div>
);

export default Card;

 
