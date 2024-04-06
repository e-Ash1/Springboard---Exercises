import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCard from "../CompanyCard/CompanyCard";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';


function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [companyElements, setCompanyElements] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            try {
                const res = await axios.get(`${BASE_URL}/companies`);
                if (Array.isArray(res.data)) {
                    setCompanies(res.data);
                } else if (Array.isArray(res.data.companies)) {
                    setCompanies(res.data.companies);
                } else {
                    console.error('Data is not an array:', res.data);
                    setCompanies([]);
                }
            } catch (err) {
                console.error('Error fetching companies:', err);
                setCompanies([]);
            }
        }

        getCompanies();
    }, []);

    useEffect(() => {
        const elements = [];
        companies.forEach(company => {
            elements.push(<CompanyCard key={company.handle} company={company} />);
        });
        setCompanyElements(elements);
    }, [companies]);

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Companies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companyElements}
            </div>
        </div>
    );
}

export default CompanyList;
