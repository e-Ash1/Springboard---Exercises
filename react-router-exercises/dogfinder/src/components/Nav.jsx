import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">DogApp</div>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/dogs" className="text-white text-sm hover:text-blue-300 transition-colors duration-200">Dogs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
