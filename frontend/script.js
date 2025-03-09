// DOM Elements
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const formError = document.getElementById('formError');
const strengthBar = document.getElementById('strengthBar');

// Real-time Username Validation
usernameInput.addEventListener('input', function () {
    if (this.value.length < 8) {
        usernameError.textContent = 'Username must be at least 8 characters long.';
        usernameError.style.display = 'block';
    } else {
        usernameError.textContent = '';
        usernameError.style.display = 'none';
    }
});

// Real-time Email Validation
emailInput.addEventListener('input', function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
    }
});

// Real-time Password Validation
passwordInput.addEventListener('input', function () {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(this.value)) {
        passwordError.textContent = 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.';
        passwordError.style.display = 'block';
    } else {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
    }
    updatePasswordStrength(this.value);
});

// Update Password Strength Indicator
function updatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\W/.test(password)) strength++;

    const strengthLevel = ['Weak', 'Medium', 'Strong'][strength - 1] || 'Weak';
    const strengthColor = ['#dc3545', '#ffc107', '#28a745'][strength - 1] || '#dc3545';
    strengthBar.style.width = `${(strength / 4) * 100}%`;
    strengthBar.style.backgroundColor = strengthColor;
}

// Signup Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('../backend/signup.php', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (data.success) {
        formError.textContent = '';
        alert(data.message);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        formError.textContent = data.message;
        formError.style.display = 'block';
    }
});

/// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/SpiritX_Byte_Knights_01/backend/login.php', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (data.success) {
        formError.textContent = '';
        alert(data.message);
        // Redirect to landing page after a short delay
        setTimeout(() => {
            window.location.href = '/SpiritX_Byte_Knights_01/backend/landing.php';
        }, 1000); // 1-second delay
    } else {
        formError.textContent = data.message;
        formError.style.display = 'block';
    }
});