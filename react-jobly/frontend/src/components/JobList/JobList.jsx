// src/components/JobList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard/JobCard';  

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await axios.get(`${BASE_URL}/jobs`);
                setJobs(response.data.jobs);  
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        }

        fetchJobs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}

export default JobList;
