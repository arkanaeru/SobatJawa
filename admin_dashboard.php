<?php
session_start();

// Koneksi ke database
$host = "127.0.0.1:3307";
$user = "root";
$pass = "";
$db = "latihan1";

$koneksi = mysqli_connect($host, $user, $pass, $db);
if (!$koneksi) {
    die("Tidak bisa terkoneksi ke database");
}

// Cek apakah admin sudah login
if (!isset($_SESSION['admin'])) {
    header("Location: admin_login.html");
    exit();
}



// Deklarasi variabel
$nama = "";
$nilai = "";
$quiz = "";
$id_quiz = "";
$sukses = "";
$error = "";

if (isset($_GET['op'])) {
    $op = $_GET['op'];
} else {
    $op = "";
}

if($op == 'delete'){
    $nama = $_GET['nama'];
    $sql1 = "delete from mhs where nama = '$nama'";
    $q1 = mysqli_query($koneksi, $sql1);
    if($q1){
        $sukses = "Berhasil hapus data";
    }else{
        $error  = "Gagal melakukan delete data";
    }
}

if ($op == 'edit') {
    $nama = $_GET['nama'];
    $sql1 = "select * from mhs where nama = '$nama'";
    $q1 = mysqli_query($koneksi, $sql1);
    $r1 = mysqli_fetch_array($q1);
    $nama = $r1['nama'];
    $nilai = $r1['nilai'];
    $quiz = $r1['quiz'];
    $id_quiz = $r1['id_quiz'];

    if ($nilai == '') {
        $error = "Data tidak ditemukan";
    }
}

if (isset($_POST['simpan'])) {
    $nama = $_POST['nama'];
    $nilai = $_POST['nilai'];
    $quiz = $_POST['quiz'];
    $id_quiz = $_POST['id_quiz'];

    if ($nama && $nilai && $quiz && $id_quiz) {
        if ($op == 'edit') {
            $sql1 = "update mhs set nama='$nama', nilai = '$nilai', quiz = '$quiz', id_quiz='$id_quiz' where nama = '$nama'";
            $q1 = mysqli_query($koneksi, $sql1);
            if ($q1) {
                $sukses = "Data berhasil diupdate";
            } else {
                $error = "Data gagal diupdate";
            }
        } else {
            $sql1 = "insert into mhs (nama, nilai, quiz, id_quiz) values ('$nama','$nilai','$quiz','$id_quiz')";
            $q1 = mysqli_query($koneksi, $sql1);
            if ($q1) {
                $sukses = "Berhasil memasukkan data baru";
            } else {
                $error = "Gagal memasukkan data";
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

        <!-- Bagian Bar Chart -->
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

        <!-- Bagian CRUD -->
        <div class="card">
            <div class="card-header">
                DATA REKAPAN PENGGUNA
            </div>
            <div class="card-body">
                <?php
                if ($error) {
                ?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $error ?>
                    </div>
                <?php
                    header("refresh:5;url=admin_dashboard.php");
                }
                ?>
                <?php
                if ($sukses) {
                ?>
                    <div class="alert alert-success" role="alert">
                        <?php echo $sukses ?>
                    </div>
                <?php
                    header("refresh:5;url=admin_dashboard.php");
                }
                ?>
                <form action="" method="POST">
                    <div class="mb-3 row">
                        <label for="nama" class="col-sm-2 col-form-label">Nama Lengkap</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nama" name="nama" value="<?php echo $nama ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="nilai" class="col-sm-2 col-form-label">Nilai Siswa</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nilai" name="nilai" value="<?php echo $nilai ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="quiz" class="col-sm-2 col-form-label">Quiz</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="quiz" name="quiz" value="<?php echo $quiz ?>">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="id_quiz" class="col-sm-2 col-form-label">id_quiz</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="id_quiz" name="id_quiz" value="<?php echo $id_quiz ?>">
                        </div>
                    </div>
                    <div class="col-12">
                        <input type="submit" name="simpan" value="Simpan Data" class="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <!-- Tabel Data Siswa -->
        <div class="card mt-4">
            <div class="card-header text-white bg-secondary">
                Data Siswa
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Nilai Siswa</th>
                            <th scope="col">Quiz</th>
                            <th scope="col">id_quiz</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql2 = "select * from mhs order by nama desc";
                        $q2 = mysqli_query($koneksi, $sql2);
                        $urut = 1;
                        while ($r2 = mysqli_fetch_array($q2)) {
                            $nama = $r2['nama'];
                            $nilai = $r2['nilai'];
                            $quiz = $r2['quiz'];
                            $id_quiz = $r2['id_quiz'];
                        ?>
                            <tr>
                                <th scope="row"><?php echo $urut++ ?></th>
                                <td><?php echo $nama ?></td>
                                <td><?php echo $nilai ?></td>
                                <td><?php echo $quiz ?></td>
                                <td><?php echo $id_quiz ?></td>
                                <td>
                                    <a href="admin_dashboard.php?op=edit&nama=<?php echo $nama ?>"><button type="button" class="btn btn-warning">Edit</button></a>
                                    <a href="admin_dashboard.php?op=delete&nama=<?php echo $nama ?>" onclick="return confirm('Yakin mau delete data?')"><button type="button" class="btn btn-danger">Delete</button></a>
                                </td>
                            </tr>
                        <?php
                        }
                        ?>
                    </tbody>
                </table>
                <p><a href="logout_adm.php">Logout</a></p>
            </div>
        </div>
    </div>
</body>

</html>
