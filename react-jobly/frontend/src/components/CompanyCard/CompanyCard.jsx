import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out">
            <h2 className="text-xl font-bold mb-2">{company.name}</h2>
            <p className="text-gray-700">{company.description}</p>
            <Link to={`/companies/${company.handle}`} className="text-blue-500 hover:text-blue-700">
                View Details
            </Link>
        </div>
    );
}

export default CompanyCard;
