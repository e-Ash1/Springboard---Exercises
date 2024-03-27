import React from 'react';
import { useParams } from 'react-router-dom';

function DogDetails({ dogs }) {
  const { name } = useParams();
  const dog = dogs.find(d => d.name.toLowerCase() === name.toLowerCase());

  if (!dog) {
    return <div className="text-center">Dog not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-64 object-contain" src={dog.src} alt={dog.name} />
        <div className="p-4">
          <h3 className="text-3xl text-gray-800 font-bold">{dog.name}</h3>
          <p className="text-gray-600">Age: {dog.age}</p>
          <ul className="mt-4 space-y-2">
            {dog.facts.map((fact, index) => (
              <li key={index} className="text-gray-700">{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DogDetails;
