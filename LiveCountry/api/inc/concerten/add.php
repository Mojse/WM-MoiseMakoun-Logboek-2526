<?php

header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$postvars = json_decode($raw, true);
if (!is_array($postvars)) { $postvars = $_POST; }

$required = ['artist','date','hour','venue','price'];
$missing = [];
foreach ($required as $k) {
    if (!isset($postvars[$k]) || $postvars[$k] === '') { $missing[] = $k; }
}
if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        'status' => 400,
        'message' => 'Missing required field(s): '.implode(', ', $missing),
        'data' => null
    ]);
    exit;
}

$artist = trim($postvars['artist']);
$date   = trim($postvars['date']); 
$hour   = trim($postvars['hour']);
$venue  = trim($postvars['venue']);
$price  = (float)$postvars['price'];

$sql = "INSERT INTO concerten (artist, date, hour, venue, price) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        'status'  => 500,
        'message' => 'Prepared Statement failed on prepare',
        'sqlError'=> $conn->error,
        'data'    => null
    ]);
    exit;
}

if (!$stmt->bind_param("ssssd", $artist, $date, $hour, $venue, $price)) {
    http_response_code(500);
    echo json_encode([
        'status'  => 500,
        'message' => 'Prepared Statement failed on bind',
        'sqlError'=> $conn->error,
        'data'    => null
    ]);
    $stmt->close();
    exit;
}

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        'status'  => 500,
        'message' => 'Prepared Statement failed on execute',
        'sqlError'=> $conn->error,
        'data'    => null
    ]);
    $stmt->close();
    exit;
}

$newId = $conn->insert_id;
$stmt->close();

echo json_encode([
  'status'=>200,'message'=>'Record added successfully',
  'data'=>['id'=>$conn->insert_id,'artist'=>$artist,'date'=>$date,'hour'=>$hour,'venue'=>$venue,'price'=>$price]
]);
exit;


?>
