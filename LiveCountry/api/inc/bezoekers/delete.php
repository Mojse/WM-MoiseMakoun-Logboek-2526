<?php

require_once __DIR__ . '/../dbcon.php'; // $conn
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

    
if (!isset($_GET['id']) || !ctype_digit($_GET['id'])) {
    echo json_encode(['status' => 400, 'error' => 'Geen geldig id']);
    exit;
}
$id = (int) $_GET['id'];

$sql = "DELETE 
        FROM bezoekers
        WHERE bezoekers.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['status' => 200, 'data' => $data]);
$conn->close();
exit;

?>