import React from 'react';

function JobCard({ job }) {
    return (
        <div className="p-4 bg-white border rounded-lg shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
        </div>
    );
}

export default JobCard;
