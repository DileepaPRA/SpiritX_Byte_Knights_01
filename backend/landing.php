<?php
session_start();

// Redirect to login if not logged in
if (!isset($_SESSION['username'])) {
    header('Location: /SpiritX_Byte_Knights_01/frontend/login.html');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="/SpiritX_Byte_Knights_01/frontend/styles.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
        <button onclick="logout()">Logout</button>
    </div>
    <script>
        function logout() {
            window.location.href = '/SpiritX_Byte_Knights_01/backend/logout.php';
        }
    </script>
</body>
</html>