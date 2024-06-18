<?php
session_start();
include 'config.php'; // file konfigurasi untuk koneksi database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Periksa apakah username sudah digunakan
    $checkUser = "SELECT * FROM pengguna WHERE username='$username'";
    $result = mysqli_query($conn, $checkUser);

    if (mysqli_num_rows($result) > 0) {
        echo "Username already exists!";
    } else {
        // Masukkan data pengguna baru ke dalam database tanpa hashing password
        $sql = "INSERT INTO pengguna (username, password) VALUES ('$username', '$password')";
        if (mysqli_query($conn, $sql)) {
            echo "Registration successful! Please <a href='login.html'>login</a>";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    }
    mysqli_close($conn);
}
?>
