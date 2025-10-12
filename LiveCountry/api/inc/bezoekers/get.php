<?php

require_once __DIR__ . '/../dbcon.php'; 
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$response = [];

if (isset($_GET['id']) && ctype_digit($_GET['id'])) {

    $bezoeker_id = (int) $_GET['id'];

    $sql = "SELECT id, first_name, last_name, birth_date, email
            FROM bezoekers 
            WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bezoeker_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $response['status'] = 200;
        $response['data'] = $result->fetch_assoc();
    } else {
        $response['status'] = 404;
        $response['error'] = "Concert met id=$bezoeker_id niet gevonden.";
    }

    $stmt->close();
} else {

    $sql = "SELECT id, first_name, last_name, birth_date, email FROM bezoekers";
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
