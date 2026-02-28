<?php

/**
 * Standalone Database Fix for Arsen Interior
 * Works WITHOUT Laravel's vendor folder.
 * Run via: https://arseninterior.in/db_standalone.php?secret=arsen_fix_2026
 */

$secret = "arsen_fix_2026";
if (!isset($_GET['secret']) || $_GET['secret'] !== $secret) {
    die("Unauthorized access.");
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database Credentials (provided by you)
$host = 'localhost';
$db   = 'u508480125_arsen_db';
$user = 'u508480125_arsen_db';
$pass = '&3mpObFE+PG';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

echo "<h1>Arsen Interior - Standalone DB Fix</h1>";

try {
    echo "<h2>1. Connecting to Database...</h2>";
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "<p style='color:green'>Connection Successful!</p>";

    echo "<h2>2. Creating 'users' table if missing...</h2>";
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        email_verified_at TIMESTAMP NULL,
        password VARCHAR(255) NOT NULL,
        remember_token VARCHAR(100) NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    
    $pdo->exec($sql);
    echo "<p style='color:green'>Users table ready.</p>";

    echo "<h2>3. Creating/Updating Admin User...</h2>";
    $adminEmail = 'admin@inymart.in';
    // Laravel uses Bcrypt. password_hash with PASSWORD_BCRYPT is compatible.
    $adminPassRaw = 'Arsen#SECURE!2026_@Admin_99';
    $hashedPass = password_hash($adminPassRaw, PASSWORD_BCRYPT);
    $now = date('Y-m-d H:i:s');

    // Check if exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$adminEmail]);
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare("UPDATE users SET password = ?, updated_at = ? WHERE email = ?");
        $stmt->execute([$hashedPass, $now, $adminEmail]);
        echo "<p style='color:green'>Admin user password UPDATED.</p>";
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(['Admin', $adminEmail, $hashedPass, $now, $now]);
        echo "<p style='color:green'>Admin user CREATED.</p>";
    }

    echo "<h3>Success!</h3>";
    echo "<ul>";
    echo "<li><b>Database:</b> $db</li>";
    echo "<li><b>Email:</b> $adminEmail</li>";
    echo "<li><b>Password:</b> $adminPassRaw</li>";
    echo "</ul>";
    echo "<p style='color:orange'>Note: This script ONLY fixed the login table. You still need to upload the 'vendor' folder to make the website work fully.</p>";

} catch (\PDOException $e) {
    echo "<p style='color:red'>DB ERROR: " . $e->getMessage() . "</p>";
}
