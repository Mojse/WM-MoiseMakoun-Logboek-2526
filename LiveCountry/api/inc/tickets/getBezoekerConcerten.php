<?php

require_once __DIR__ . '/../dbcon.php'; // $conn
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

    
if (!isset($_GET['bezoeker_id']) || !ctype_digit($_GET['bezoeker_id'])) {
    echo json_encode(['status' => 400, 'error' => 'Geen geldig concert_id']);
    exit;
}
$bezoeker_id = (int) $_GET['bezoeker_id'];

$sql = "SELECT c.*
        FROM concerten c
        JOIN tickets t ON t.concert_id = c.id
        WHERE t.bezoeker_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $bezoeker_id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['status' => 200, 'data' => $data]);
$conn->close();
exit;

?>