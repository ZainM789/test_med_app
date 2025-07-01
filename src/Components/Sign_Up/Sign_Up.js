// signup.js

// Form validation & submit handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const phoneField = document.getElementById('phone');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

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

        // PHONE NUMBER: must be exactly 10 digits
        const phoneValue = phoneField.value.trim();
        if (!/^\d{10}$/.test(phoneValue)) {
            phoneField.style.borderColor = '#ff3b3b';
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        if (!valid) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulate successful registration
        alert('Registration successful!\n(You can now proceed to login.)');
        form.reset();
    });

    form.addEventListener('reset', function() {
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