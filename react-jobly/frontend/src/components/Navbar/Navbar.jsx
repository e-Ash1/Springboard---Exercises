import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ isAuthenticated }) {
  return (
    <nav className="bg-white border-gray-200 px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Jobly
        </NavLink>

        <div className="flex items-center md:order-2">
            {isAuthenticated ? (
                <>
                    <NavLink to="/profile" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ml-4">Profile</NavLink>
                    <NavLink to="/logout" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ml-4">Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ml-4">Login</NavLink>
                    <NavLink to="/signup" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 ml-4">Signup</NavLink>
                </>
            )}
        </div>

        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4 md:ml-4">
            <NavLink to="/companies" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">Companies</NavLink>
            <NavLink to="/jobs" className="text-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">Jobs</NavLink>
          </div>
        )}
        
      </div>
    </nav>
  );
}

export default NavBar;
