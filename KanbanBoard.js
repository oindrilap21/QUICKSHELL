import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import GroupingButtons from "./GroupingButtons";
import "../App.css"; // Pure CSS styling

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sortBy, setSortBy] = useState('priority'); // Sort tickets by priority or title

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => setTickets(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    localStorage.setItem('grouping', newGrouping);
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') return b.priority - a.priority;
    return a.title.localeCompare(b.title);
  });

  const groupedTickets = groupTickets(sortedTickets, grouping);

  return (
    <div className="kanban-board">
      <GroupingButtons onChange={handleGroupingChange} />
      <div className="kanban-columns">
        {Object.entries(groupedTickets).map(([key, group]) => (
          <div key={key} className="kanban-column">
            <h2>{key}</h2>
            {group.map(ticket => (
              <Card key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to group tickets based on selected criteria
const groupTickets = (tickets, grouping) => {
  switch (grouping) {
    case 'user':
      return tickets.reduce((acc, ticket) => {
        acc[ticket.user] = acc[ticket.user] || [];
        acc[ticket.user].push(ticket);
        return acc;
      }, {});
    case 'priority':
      return tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    default: // Status as default grouping
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
  }
};

export default KanbanBoard;
 
