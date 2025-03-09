<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        die("Email does not exist.");
    }

    // Verify password
    if (!password_verify($password, $user['password'])) {
        die("Incorrect password.");
    }

    // Store user in session
    $_SESSION['username'] = $user['username'];

    // Redirect to landing page
    header("Location: /SpiritX_Byte_Knights_01/backend/landing.php");
    exit;
}
?>