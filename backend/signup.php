<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirmPassword']);

    // Validate input
    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        exit;
    }

    if (strlen($username) < 8) {
        echo json_encode(['success' => false, 'message' => 'Username must be at least 8 characters.']);
        exit;
    }

    // Check if username or email already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->execute(['username' => $username, 'email' => $email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Username or email already exists.']);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->execute(['username' => $username, 'email' => $email, 'password' => $hashedPassword]);

    echo json_encode(['success' => true, 'message' => 'Signup successful! Redirecting...']);
    // Redirect to login page after 2 seconds
    header('Refresh: 2; URL=/SpiritX_Byte_Knights_01/frontend/login.html');
    exit;
}
?>