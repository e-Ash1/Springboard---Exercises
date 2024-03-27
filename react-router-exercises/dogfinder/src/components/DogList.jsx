import React from 'react';
import { Link } from 'react-router-dom';

function DogList({ dogs }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Meet Our Dogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map(dog => (
          <Link key={dog.name} to={`/dogs/${dog.name.toLowerCase()}`} className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
            <img className="w-full h-48 object-contain" src={dog.src} alt={dog.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{dog.name}</div>
              <p className="text-gray-700 text-base">
                {dog.facts[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DogList;
