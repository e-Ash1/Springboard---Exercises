import React from 'react';
import { useNavigate } from 'react-router-dom';

function VendingMachine() {
  const navigate = useNavigate();
  const snacks = [
    { id: 1, name: 'Chips' },
    { id: 2, name: 'Candy' },
    { id: 3, name: 'Soda' }
  ];

  return (
    <div className="p-5 bg-gray-800 min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-radial at-center from-transparent via-white/20 to-transparent rounded-full bg-[length:100%_100%] animate-pulse-fast">
        <div className="absolute inset-0 bg-gradient-conic from-purple-400 via-pink-500 to-yellow-500 rounded-full opacity-50 blur-xl"></div>
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-6 align-middle">Vending Machine</h1>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto align-middle">
          {snacks.map((snack) => (
            <button
              key={snack.id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
              onClick={() => navigate(`/snack/${snack.id}`)}
            >
              {snack.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VendingMachine;
