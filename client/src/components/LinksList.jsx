import React from 'react';
import { Link } from 'react-router-dom';

const LinksList = ({ links, onRemoveLink }) => {
  if (!links.length) {
    return <p>You're not shortened any link yet</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th style={{ textAlign: 'left' }}>From</th>
          <th style={{ textAlign: 'left' }}>Short</th>
          <th>Link Info</th>
          <th>Date</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={`row_${index}`}>
            <td>{index + 1}</td>
            <td style={{ textAlign: 'left' }}>{link.from}</td>
            <td style={{ textAlign: 'left' }}>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>details</Link>
            </td>
            <td>{new Date(link.date).toLocaleDateString()}</td>
            <td>
              <svg
                className="rem-btn"
                onClick={() => onRemoveLink(link._id)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e88e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
