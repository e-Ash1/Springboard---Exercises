class AuthService {
    async login(email, password) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            
            console.log('Login successful:', data);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async signup(username, email, password) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            const data = await response.json();
            console.log('Signup successful:', data);
            return data;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }
}


export default AuthService;