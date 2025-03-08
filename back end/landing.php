<?php
// landing.php

session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.html');
    exit;
}

$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Welcome</h2>
        <p id="welcomeMessage">Hello, <?php echo htmlspecialchars($username); ?>!</p>
        <button onclick="logout()">Logout</button>
    </div>
    <script src="script.js"></script>
</body>
</html>