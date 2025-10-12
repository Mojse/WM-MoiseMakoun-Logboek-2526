<?php

require_once __DIR__ . '/../dbcon.php'; 
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$response = [];

if (isset($_GET['id']) && ctype_digit($_GET['id'])) {

    $concert_id = (int) $_GET['id'];

    $sql = "SELECT id, artist, `date`, `hour`, venue, price 
            FROM concerten 
            WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $concert_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $response['status'] = 200;
        $response['data'] = $result->fetch_assoc();
    } else {
        $response['status'] = 404;
        $response['error'] = "Concert met id=$concert_id niet gevonden.";
    }

    $stmt->close();
} else {

    $sql = "SELECT id, artist, `date`, `hour`, venue, price FROM concerten";
    $result = $conn->query($sql);

    if (!$result) {
        $response['status'] = 500;
        $response['error'] = $conn->error;
    } else {
        $response['status'] = 200;
        $response['data'] = $result->fetch_all(MYSQLI_ASSOC);
    }

    $result->free();
}

$conn->close();
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;
?>
