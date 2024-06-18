<?php
session_start();
include 'config.php'; // file konfigurasi untuk koneksi database

$username = $_POST['username'];
$password = $_POST['password'];

// Hash password jika disimpan dengan hashing
// $password = hash('sha256', $password);

$sql = "SELECT * FROM pengguna WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $_SESSION['username'] = $username;
    header("Location: index.html");
} else {
    echo "Login failed. Invalid username or password.";
}

mysqli_close($conn);
?>
