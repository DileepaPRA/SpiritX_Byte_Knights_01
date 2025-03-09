<?php
$host = 'localhost';
$dbname = 'SecureConnect';
$db_user = 'root';
$db_pass = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>