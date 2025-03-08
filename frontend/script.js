// DOM Elements
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordStrengthDiv = document.getElementById('passwordStrength');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const loginUsernameError = document.getElementById('loginUsernameError');
const loginPasswordError = document.getElementById('loginPasswordError');

// Password Strength Levels
const strengthLevels = [
    { color: '#dc3545', text: 'Weak' }, // Red
    { color: '#ffc107', text: 'Medium' }, // Yellow
    { color: '#28a745', text: 'Strong' } // Green
];

// Real-time Username Validation
usernameInput.addEventListener('input', () => {
    const username = usernameInput.value.trim();
    if (username.length < 8) {
        usernameError.textContent = 'Username must be at least 8 characters long.';
        usernameError.style.display = 'block';
    } else {
        usernameError.style.display = 'none';
    }
});

// Real-time Password Validation
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value.trim();
    validatePassword(password);
    updatePasswordStrength(password);
});

// Real-time Confirm Password Validation
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.display = 'block';
    } else {
        confirmPasswordError.style.display = 'none';
    }
});

// Validate Password Function
function validatePassword(password) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        passwordError.style.display = 'block';
    } else if (!hasLowercase || !hasUppercase || !hasSpecialChar) {
        passwordError.textContent =
            'Password must contain at least one lowercase letter, one uppercase letter, and one special character.';
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
}

// Update Password Strength Indicator
function updatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const strengthLevel = strengthLevels[strength - 1] || strengthLevels[0];
    passwordStrengthDiv.innerHTML = `<div style="width: ${(strength / 4) * 100}%; background-color: ${strengthLevel.color};"></div>`;
}

// Signup Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.display = 'block';
        return;
    }

    // Simulate backend signup (replace with actual API call)
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            alert('Signup successful! Redirecting to login page...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
});

// Login Form Submission
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate backend login (replace with actual API call)
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('username', username); // Store username in localStorage
            window.location.href = 'landing.html';
        } else {
            alert(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});

// Landing Page Logic
const welcomeMessage = document.getElementById('welcomeMessage');
if (welcomeMessage) {
    const username = localStorage.getItem('username');
    if (username) {
        welcomeMessage.textContent = `Hello, ${username}!`;
    } else {
        window.location.href = 'login.html'; // Redirect if not logged in
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}