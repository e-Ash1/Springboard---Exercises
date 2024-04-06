import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class JoblyApi {
    static token;

    static async request(endpoint, data = {}, method = 'GET') {
        const url = `${BASE_URL}/${endpoint}`;
        console.log('Preparing API call with:');
        console.log('URL:', url);
        console.log('Method:', method);
        console.log('Data:', data);

        const headers = {
            Authorization: `Bearer ${this.token}`,  
        };

        try {
            if (method === 'GET') {
                const response = await axios.get(url, { params: data, headers });
                return response.data;
            } else if (method === 'POST') {
                const response = await axios.post(url, data, { headers });
                return response.data;
            }
        } catch (err) {
            console.error('API Error:', err.response);
            const message = err.response?.data?.error?.message || 'Unknown error occurred';
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async login(username, password) {
        try {
            const response = await this.request("auth/login", { username, password }, 'POST');
            console.log(`THIS IS THE LOGIN RESPONSE: ${response}`);
            return response;
        } catch (error) {
            console.error(`Error has occurred:`, error);
            throw error;
        }
    }

    static async register({ username, password, email, firstName, lastName }) {
        const endpoint = 'auth/register';
        const data = { username, password, email, firstName, lastName };
        
        try {
            const response = await this.request(endpoint, data, 'POST');
            const { token } = response;
            this.setToken(token);  // Set the token after successful registration
            return token;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    static async getCurrentUser(username) {
        const endpoint = `users/${username}`;
        try {
            const result = await this.request(endpoint);
            return result.user; 
        } catch (err) {
            console.error(`Error fetching user data for ${username}:`, err);
            throw err;
        }
    }

    static setToken(newToken) {
        JoblyApi.token = newToken;
        localStorage.setItem('jobly-token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;  // Set the default Authorization header in axios
    }

    static async getCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }
}

export default JoblyApi;
