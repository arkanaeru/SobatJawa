<?php
session_start();
include 'config.php'; // Pastikan file ini berisi koneksi ke database

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_admin = $_POST['id_admin'];
    $kode_admin = $_POST['kode_admin'];

    // Query untuk memeriksa admin di database
    $query = "SELECT * FROM admin WHERE id_admin = ? AND kode_admin = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $id_admin, $kode_admin);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Login berhasil, simpan informasi admin di sesi
        $_SESSION['admin'] = $id_admin;
        header("Location: admin_dashboard.php");
        exit();
    } else {
        // Login gagal
        echo "<script>alert('Invalid Admin ID or Code'); window.location.href='admin_login.html';</script>";
    }
}
?>
