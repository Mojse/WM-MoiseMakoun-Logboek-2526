<?php
header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$postvars = json_decode($raw, true);
if (!is_array($postvars)) { $postvars = $_POST; }

$required = ['id','first_name','last_name','birth_date','email'];
$missing = [];
foreach ($required as $k) {
    if (!isset($postvars[$k]) || $postvars[$k] === '') { $missing[] = $k; }
}
if (!empty($missing)) {
    echo json_encode(['status'=>400,'message'=>'Missing required field(s): '.implode(', ', $missing),'data'=>[]]);
    return;
}

$id     = (int)$postvars['id'];
$first_name = trim($postvars['first_name']);
$last_name   = trim($postvars['last_name']);
$birth_date   = trim($postvars['birth_date']);
$email  = trim($postvars['email']);

$sql = "UPDATE bezoekers SET first_name=?, last_name=?, birth_date=?, email=? WHERE id=?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status'=>500,'message'=>'prepare failed','data'=>[]]);
    return;
}

if (!$stmt->bind_param("ssssi", $first_name, $last_name, $birth_date, $email, $id)) {
    echo json_encode(['status'=>500,'message'=>'bind failed','data'=>[]]);
    $stmt->close();
    return;
}

if (!$stmt->execute()) {
    echo json_encode(['status'=>500,'message'=>'execute failed','data'=>[]]);
    $stmt->close();
    return;
}

$affected = $stmt->affected_rows;
$stmt->close();

echo json_encode([
  'status'=>200,
  'message'=> $affected === 0 ? 'No changes (record unchanged)' : 'Record updated successfully',
  'data'=>[[
    'id'=>$id,'first_name'=>$first_name,'last_name'=>$last_name,'birth_date'=>$birth_date,'email'=>$email
  ]]
]);
return;

?>