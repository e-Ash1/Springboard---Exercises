import React from 'react';

//Leaf-component of JokeList.js that templates kvp received from the parent-component:
function Joke({ id, vote, votes, text }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="mb-4">
        <div className="text-xl">{text}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => vote(prev => prev.map(j => j.id === id ? { ...j, votes: j.votes + 1 } : j))}
          >
            <i className="fas fa-check">X</i>
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => vote(prev => prev.map(j => j.id === id ? { ...j, votes: j.votes - 1 } : j))}
          >
            <i className="fas fa-times">O</i>
          </button>
        </div>
        <span className="text-lg font-semibold">{votes}</span>
      </div>
    </div>
  );
}

export default Joke;
