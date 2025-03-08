<?php
// signup.php

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate username length
    if (strlen($username) < 8) {
        echo json_encode(['success' => false, 'message' => 'Username must be at least 8 characters long.']);
        exit;
    }

    // Validate password complexity
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/', $password)) {
        echo json_encode(['success' => false, 'message' => 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.']);
        exit;
    }

    // Check if username already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Username already exists.']);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert new user into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->execute(['username' => $username, 'password' => $hashedPassword]);

    echo json_encode(['success' => true, 'message' => 'Signup successful!']);
}
?>