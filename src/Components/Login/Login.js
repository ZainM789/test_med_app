document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.getElementById('toggle-password');

    function isValidEmail(email) {
        // Accepts phone number (as per placeholder) or simple email for demo
        return /^[0-9]{10,15}$/.test(email) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = "* Please enter a valid email address";
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.textContent = '';
        }

        if (passwordInput.value.length < 8) {
            passwordError.textContent = "Must be at least 8 characters";
            passwordError.style.display = 'block';
            valid = false;
        } else {
            passwordError.textContent = '';
        }

        if (valid) {
            alert("Login successful!");
            loginForm.reset();
        }
    });

    loginForm.addEventListener('reset', function() {
        emailError.textContent = '';
        passwordError.textContent = '';
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.innerHTML = type === 'password'
            ? '<i class="fa-regular fa-eye"></i>'
            : '<i class="fa-regular fa-eye-slash"></i>';
    });

    document.querySelector('.signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'Sign_up.html';
    });
});