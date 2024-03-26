import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'font-bold' : undefined}
            style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/snack/1"
            className={({ isActive }) => isActive ? 'font-bold' : undefined}
            style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
          >
            Chips
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/snack/2"
            className={({ isActive }) => isActive ? 'font-bold' : undefined}
            style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
          >
            Candy
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/snack/3"
            className={({ isActive }) => isActive ? 'font-bold' : undefined}
            style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
          >
            Soda
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
