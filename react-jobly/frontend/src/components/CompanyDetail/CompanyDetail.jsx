import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';



function CompanyDetail() {
    const [company, setCompany] = useState(null);
    const { handle } = useParams();

    useEffect(() => {
        async function fetchCompanyDetail() {
            try {
                const response = await axios.get(`${BASE_URL}/companies/${handle}`);
                setCompany(response.data.company);
            } catch (error) {
                console.error('Error fetching company details:', error);
    
            }
        }

        fetchCompanyDetail();
    }, [handle]);

    if (!company) {
        return <div>Loading...</div>;  // Loading Splash
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-2">{company.name}</h2>
            <p className="text-gray-600 mb-4">{company.description}</p>
            <div className="mb-3">
                <strong>Number of Employees:</strong> {company.numEmployees}
            </div>
            {company.logoUrl && (
                <div className="mb-3">
                    <img src={company.logoUrl} alt={`${company.name} logo`} className="max-w-xs h-auto" />
                </div>
            )}
            
            {/* Lists the jobs within the company */}
            {company.jobs && company.jobs.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold mb-2">Jobs at {company.name}</h3>
                    <ul>
                        {company.jobs.map(job => (
                            <li key={job.id} className="mb-2 p-2 border-b">
                                <strong>{job.title}</strong> - Salary: {job.salary}, Equity: {job.equity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CompanyDetail;
