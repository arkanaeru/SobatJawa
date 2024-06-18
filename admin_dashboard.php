<?php
session_start();
include 'config.php'; // Pastikan file ini berisi koneksi ke database

// Cek apakah admin sudah login
if (!isset($_SESSION['admin'])) {
    header("Location: admin_login.html");
    exit();
}

// Deklarasi variabel
$id_quiz    = "";
$id_admin   = "";
$username   = "";
$nama       = "";
$nilai      = "";
$sukses     = "";
$error      = "";

if (isset($_GET['op'])) {
    $op = $_GET['op'];
} else {
    $op = "";
}
if($op == 'delete'){
    $id_quiz    = $_GET['id_quiz'];
    $sql1       = "DELETE FROM quiz WHERE id_quiz = '$id_quiz'";
    $q1         = mysqli_query($conn, $sql1);
    if($q1){
        $sukses = "Berhasil hapus data";
    } else {
        $error  = "Gagal melakukan delete data";
    }
}
if ($op == 'edit') {
    $id_quiz    = $_GET['id_quiz'];
    $sql1       = "SELECT * FROM quiz WHERE id_quiz = '$id_quiz'";
    $q1         = mysqli_query($conn, $sql1);
    $r1         = mysqli_fetch_array($q1);
    $id_admin   = $r1['id_admin'];
    $username   = $r1['username'];
    $nama       = $r1['nama'];
    $nilai      = $r1['nilai'];

    if ($id_quiz == '') {
        $error = "Data tidak ditemukan";
    }
}
if (isset($_POST['simpan'])) {
    $id_quiz    = $_POST['id_quiz'];
    $id_admin   = $_POST['id_admin'];
    $username   = $_POST['username'];
    $nama       = $_POST['nama'];
    $nilai      = $_POST['nilai'];

    if ($id_quiz && $id_admin && $username && $nama && $nilai) {
        if ($op == 'edit') {
            $sql1       = "UPDATE quiz SET id_admin='$id_admin', username='$username', nama='$nama', nilai='$nilai' WHERE id_quiz = '$id_quiz'";
            $q1         = mysqli_query($conn, $sql1);
            if ($q1) {
                $sukses = "Data berhasil diupdate";
            } else {
                $error  = "Data gagal diupdate";
            }
        } else {
            $sql1   = "INSERT INTO quiz (id_quiz, id_admin, username, nama, nilai) VALUES ('$id_quiz', '$id_admin','$username','$nama','$nilai')";
            $q1     = mysqli_query($conn, $sql1);
            if ($q1) {
                $sukses     = "Berhasil memasukkan data baru";
            } else {
                $error      = "Gagal memasukkan data";
            }
        }
    } else {
        $error = "Silakan masukkan semua data";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - SobatJawa</title>
    <link rel="stylesheet" href="./css/dashboard.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .mx-auto {
            width: 800px
        }
        .card {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to Admin Dashboard, <?php echo $_SESSION['admin']; ?>!</h2>
        <canvas id="myChart" width="400" height="200"></canvas>
        <script>
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Maret', 'April', 'Mei', 'Juni'],
                    datasets: [{
                        label: 'Data Pengunjung Sobat Jawa',
                        data: [5, 10, 15, 10],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        </script>
        <p><a href="logout_adm.php">Logout</a></p>
    </div>

    <div class="mx-auto">
        <!-- untuk memasukkan data -->
        <div class="card">
            <div class="card-header">
                DATA REKAPAN PENGGUNA
            </div>
            <div class="card-body">
                <?php
                if ($error) {
                    echo "<div class='alert alert-danger' role='alert'>$error</div>";
                    header("refresh:5;url=admin_dashboard.php");
                }
                if ($sukses) {
                    echo "<div class='alert alert-success' role='alert'>$sukses</div>";
                    header("refresh:5;url=admin_dashboard.php");
                }
                ?>
                <form action="" method="POST">
                    <div class="mb-3 row">
                        <label for="id_quiz" class="col-sm-2 col-form-label">ID Quiz</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="id_quiz" name="id_quiz" value="<?php echo $id_quiz ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="id_admin" class="col-sm-2 col-form-label">ID Admin</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="id_admin" name="id_admin" value="<?php echo $id_admin ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="username" class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="username" name="username" value="<?php echo $username ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="nama" class="col-sm-2 col-form-label">Nama Lengkap</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nama" name="nama" value="<?php echo $nama ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="nilai" class="col-sm-2 col-form-label">Nilai</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nilai" name="nilai" value="<?php echo $nilai ?>">
                        </div>
                    </div>
                    <div class="col-12">
                        <input type="submit" name="simpan" value="Simpan Data" class="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <!-- untuk mengeluarkan data -->
        <div class="card">
            <div class="card-header text-white bg-secondary">
                Data quiz
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                    <thead>
    <tr>
        <th scope="col">No.</th>
        <th scope="col">ID Quiz</th>
        <th scope="col">ID Admin</th>
        <th scope="col">Username</th>
        <th scope="col">Nama</th>
        <th scope="col">Nilai</th>
        <th scope="col">Aksi</th>
    </tr>
</thead>
<tbody>
    <?php
    $sobatjw = "SELECT * FROM quiz ORDER BY id_quiz DESC";
    $jw   = mysqli_query($conn, $sobatjw);
    $urut = 1;
    while ($r2 = mysqli_fetch_array($jw)) {
        if (isset($r2['id_quiz'])) {
            $id_quiz    = $r2['id_quiz'];
        } else {
            $id_quiz = ''; // atau tindakan lain sesuai kebutuhan
        }
    
        if (isset($r2['id_admin'])) {
            $id_admin   = $r2['id_admin'];
        } else {
            $id_admin = ''; // atau tindakan lain sesuai kebutuhan
        }
    
        if (isset($r2['username'])) {
            $username   = $r2['username'];
        } else {
            $username = ''; // atau tindakan lain sesuai kebutuhan
        }
    
        if (isset($r2['nama'])) {
            $nama       = $r2['nama'];
        } else {
            $nama = ''; // atau tindakan lain sesuai kebutuhan
        }
    
        if (isset($r2['nilai'])) {
            $nilai      = $r2['nilai'];
        } else {
            $nilai = ''; // atau tindakan lain sesuai kebutuhan
        }
    
        // Lanjutkan proses tampilan data di sini
    }
    
    ?>
        <tr>
            <th scope="row"><?php echo $urut++ ?></th>
            <td><?php echo $id_quiz ?></td>
            <td><?php echo $id_admin ?></td>
            <td><?php echo $username ?></td>
            <td><?php echo $nama ?></td>
            <td><?php echo $nilai ?></td>
            <td>
                <a href="admin_dashboard.php?op=edit&id_quiz=<?php echo $id_quiz ?>" class="btn btn-sm btn-warning">Edit</a>
                <a href="admin_dashboard.php?op=delete&id_quiz=<?php echo $id_quiz ?>" class="btn btn-sm btn-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')">Hapus</a>
            </td>
        </tr>
    <?php
    ?>
</tbody>
