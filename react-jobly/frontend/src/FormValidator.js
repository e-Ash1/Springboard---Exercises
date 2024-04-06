class FormValidator {
    validateLogin(email, password) {
        const errors = {};

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    }

    validateSignup(username, email, password) {
        const errors = this.validateLogin(email, password);

        if (!username) {
            errors.username = "Username is required";
        }

        return errors;
    }
}

export default FormValidator;
