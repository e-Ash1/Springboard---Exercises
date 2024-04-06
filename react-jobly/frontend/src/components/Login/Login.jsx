import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from '../../../api';
import UserContext from '../../../src/UserContext';

function Login() {
    const { handleLogin } = useContext(UserContext);
    const [user, setUser] = useState({
        username: '',
        password: '',
        token:''
    });
    const navigate = useNavigate();
    
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setUser(userData => ({
            ...userData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = user;
        console.log(`This is being sent to the BE: ${username} ${password}`)
        try {
            const response = await JoblyApi.login(username, password);
            console.log(`Response from login:`, response);
            const token = response.token || response;
    
            if (token) {
                JoblyApi.setToken(token);
                handleLogin({ username, token });  
                navigate("/");  
            } else {
                console.error("Login failed: No token received");
            }
        } catch (error) {
            console.error(`Login failed:`, error);
        }
    };
    
        
        

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        value={user.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
