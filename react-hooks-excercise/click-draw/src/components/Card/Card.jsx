import React from 'react';
import './Card.css';

const Card = ({ image }) => {
    if (!image) return null;
  
    return (
    <div>
        <img src={image} alt="Playing Card" />
    </div>
    );

  };

export default Card;