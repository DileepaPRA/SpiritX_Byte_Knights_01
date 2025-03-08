// DOM Elements
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const passwordStrengthDiv = document.getElementById('passwordStrength');

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

// Real-time Confirm Password Validation
confirmPasswordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    if (this.value !== password) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.display = 'block';
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordError.style.display = 'none';
    }
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
    passwordStrengthDiv.innerHTML = `<div style="width: ${(strength / 4) * 100}%; background-color: ${strengthColor}; height: 100%;"></div>`;
}

// Signup Form Submission
signupForm.addEventListener('submit', function (e) {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !password || !confirmPassword) {
        e.preventDefault();
        alert('Please fill in all fields.');
    }
});