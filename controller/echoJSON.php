<?php
$servername = "localhost";
$username   = "root";
$password   = "VanThai041225@";
$dbname     = "NganHangCauHoiTracNghiem";


$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Kết nối thất bại: " . $connection->connect_error]);
    exit();
}

$sql = "SELECT id, cauHoi, dapAnA, dapAnB, dapAnC, dapAnD, dapAnDung, mucDo FROM CauHoi";
$result = $connection->query($sql);

if($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$connection->close();
?>
