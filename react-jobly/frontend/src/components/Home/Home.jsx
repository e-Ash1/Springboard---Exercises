import React from 'react';
import { Link } from 'react-router-dom';

function Homepage({ isAuthenticated }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Jobly</h1>
        <p className="mb-8">Your one-stop shop for finding your dream job or hiring top talent.</p>

        {!isAuthenticated && (
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div>
            <Link to="/jobs" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              View Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
