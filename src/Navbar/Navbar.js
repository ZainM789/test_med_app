// Navbar.js

// Add 'active' class to the clicked nav link
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // prevent navigation for demo
        document.querySelectorAll('.navbar-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Optionally, you could add handlers to show content per section here