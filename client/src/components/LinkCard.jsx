import React, { useState } from 'react';

const LinkCard = ({ link }) => {
  const [clicks, setClicks] = useState(link.clicks);
  const clickHandler = () => {
    setClicks(clicks + 1);
  };
  return (
    <>
      <h2>Link details: </h2>
      <p>
        {'Shortened link: '}
        <a onClick={clickHandler} href={link.to} target="_blank" rel="noreferrer noopener">
          {link.to}
        </a>
      </p>
      <p>
        {'From: '}
        <a href={link.from} target="_blank" rel="noreferrer noopener">
          {link.from}
        </a>
      </p>
      <p>
        {'Click count: '} <strong>{clicks}</strong>
      </p>
      <p>
        {'Creation date: '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
