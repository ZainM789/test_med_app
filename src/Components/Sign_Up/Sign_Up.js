// signup.js

// Form validation & submit handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Simple validation (HTML5 will check 'required', this is extra for demo)
        let valid = true;
        const fields = ['role', 'name', 'phone', 'password'];
        fields.forEach(id => {
            const field = document.getElementById(id);
            if (!field.value) {
                field.style.borderColor = '#ff3b3b';
                valid = false;
            } else {
                field.style.borderColor = '#888';
            }
        });

        if (!valid) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulate successful registration
        alert('Registration successful!\n(You can now proceed to login.)');
        form.reset();
    });

    form.addEventListener('reset', function() {
        // Reset border color
        ['role', 'name', 'phone', 'password'].forEach(id => {
            document.getElementById(id).style.borderColor = '#888';
        });
    });

    // Optional: Link 'Login' to a login page if exists
    document.querySelector('.login-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'login.html'; // Adjust as needed
    });
});