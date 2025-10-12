<?php

header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$postvars = json_decode($raw, true);
if (!is_array($postvars)) { $postvars = $_POST; }

// Vereiste velden checken
$required = ['first_name','last_name','birth_date','email'];
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

// Types casten / saneren
$first_name = trim($postvars['first_name']);
$last_name   = trim($postvars['last_name']);   // yyyy-mm-dd (of zoals jouw dataset gebruikt)
$birth_date   = trim($postvars['birth_date']);   // hh:mm
$email  = trim($postvars['email']);

// Prepared statement
$sql = "INSERT INTO bezoekers (first_name, last_name, birth_date, email) VALUES (?, ?, ?, ?)";
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

if (!$stmt->bind_param("ssss", $first_name, $last_name, $birth_date, $email)) {
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
  'data'=>['id'=>$conn->insert_id,'first_name'=>$first_name,'last_name'=>$last_name,'bitrh_date'=>$birth_date,'email'=>$email]
]);
exit;


?>
