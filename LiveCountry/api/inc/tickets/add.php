<?php
require_once __DIR__ . '/../dbcon.php';

header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$postvars = json_decode($raw, true);
if (!is_array($postvars)) { $postvars = $_POST; }

$required = ['bezoeker_id', 'concert_id'];
$missing = [];
foreach ($required as $k) {
    if (!isset($postvars[$k]) || $postvars[$k] === '') { $missing[] = $k; }
}
if (!empty($missing)) {
    echo json_encode([
        'status'  => 400,
        'message' => 'Missing: ' . implode(', ', $missing),
        'data'    => []
    ]);
    return;
}

$bezoeker_id = (int)$postvars['bezoeker_id'];
$concert_id  = (int)$postvars['concert_id'];

if ($bezoeker_id <= 0 || $concert_id <= 0) {
    echo json_encode([
        'status'  => 400,
        'message' => 'IDs must be positive integers',
        'data'    => []
    ]);
    return;
}

$sql = "INSERT INTO tickets (bezoeker_id, concert_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        'status'  => 500,
        'message' => 'prepare failed',
        'sqlError'=> $conn->error,
        'data'    => []
    ]);
    return;
}

if (!$stmt->bind_param("ii", $bezoeker_id, $concert_id)) {
    echo json_encode([
        'status'  => 500,
        'message' => 'bind failed',
        'sqlError'=> $conn->error,
        'data'    => []
    ]);
    $stmt->close();
    return;
}

if (!$stmt->execute()) {
    echo json_encode([
        'status'  => 500,
        'message' => 'execute failed',
        'sqlError'=> $conn->error,
        'data'    => []
    ]);
    $stmt->close();
    return;
}

$newId = $conn->insert_id;
$stmt->close();

echo json_encode([
    'status'  => 200,
    'message' => 'Ticket successfully purchased',
    'data'    => [[
        'id'          => $newId,
        'bezoeker_id' => $bezoeker_id,
        'concert_id'  => $concert_id
    ]]
]);
return;
