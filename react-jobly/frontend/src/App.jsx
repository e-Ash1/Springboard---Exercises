import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Login, Signup, Home, CompanyList, CompanyDetail, JobList, Profile } from './components/index';
import { UserContextProvider } from './UserContext';

function App() {
    return (
        <UserContextProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
}

export default App;
