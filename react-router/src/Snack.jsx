import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { snackImages } from './assets/images';  

function Snack() {
  const { snackId } = useParams();
  const navigate = useNavigate();

  const snacks = {
    '1': { name: 'Chips', color: 'bg-yellow-300' },
    '2': { name: 'Candy', color: 'bg-pink-300' },
    '3': { name: 'Soda', color: 'bg-green-300' }
  };

  Object.keys(snacks).forEach(key => {
    const snackName = snacks[key].name;
    snacks[key].image = snackImages[snackName] || null;
  });

  const snack = snacks[snackId] || { name: 'Unknown', color: 'bg-gray-300', image: null };

  return (
    <div className={`relative ${snack.color} min-h-screen flex flex-col items-center justify-center overflow-hidden`}>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-4">{snack.name}</h1>
        <img src={snack.image} alt={snack.name} className="mb-4" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Snack;
