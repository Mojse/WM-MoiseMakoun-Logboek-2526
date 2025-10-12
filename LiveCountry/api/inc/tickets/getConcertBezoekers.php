<?php
    require_once __DIR__ . '/../dbcon.php'; // $conn
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    
if (!isset($_GET['concert_id']) || !ctype_digit($_GET['concert_id'])) {
    echo json_encode(['status' => 400, 'error' => 'Geen geldig concert_id']);
    exit;
}
$concert_id = (int) $_GET['concert_id'];

$sql = "SELECT b.*
        FROM bezoekers b
        JOIN tickets t ON t.bezoeker_id = b.id
        WHERE t.concert_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $concert_id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['status' => 200, 'data' => $data]);
$conn->close();
exit;
?>
