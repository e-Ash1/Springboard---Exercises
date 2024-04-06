import React, { createContext, useState, useEffect } from 'react';
import JoblyApi from '../api';

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('jobly-token') || null);


    async function fetchCurrentUser() {
        if (token && currentUser?.username) {  
            JoblyApi.setToken(token);
            try {
                const user = await JoblyApi.getCurrentUser(currentUser.username);  
                setCurrentUser(user);
            } catch (error) {
                console.error("Error loading user data", error);
                setCurrentUser(null);
                localStorage.removeItem('jobly-token'); 
                setToken(null);
            }
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, [token, currentUser?.username]); 

    const handleLogin = async (loginToken, user) => {
        try {
            localStorage.setItem('jobly-token', loginToken);
            setToken(loginToken);
            setCurrentUser(user);
        } catch (error) {
            console.error("Error handling login", error);
            throw error; 
        }
    };

    const handleSignUp = async (formData) => {
        try {
            const signUpToken = await JoblyApi.register(formData);
            localStorage.setItem('jobly-token', signUpToken);
            setToken(signUpToken);
            await fetchCurrentUser();
        } catch (error) {
            console.error("Error handling sign-up", error);
            throw error; 
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('jobly-token');
        JoblyApi.setToken(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, handleLogin, handleSignUp, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
