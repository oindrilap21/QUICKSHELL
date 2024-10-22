import React from "react";

const GroupingButtons = ({ onChange }) => (
  <div className="grouping-buttons">
    <button onClick={() => onChange('status')}>By Status</button>
    <button onClick={() => onChange('user')}>By User</button>
    <button onClick={() => onChange('priority')}>By Priority</button>
  </div>
);

export default GroupingButtons;

 
