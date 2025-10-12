<?php
header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$postvars = json_decode($raw, true);
if (!is_array($postvars)) { $postvars = $_POST; }

$required = ['id','artist','date','hour','venue','price'];
$missing = [];
foreach ($required as $k) {
    if (!isset($postvars[$k]) || $postvars[$k] === '') { $missing[] = $k; }
}
if (!empty($missing)) {
    echo json_encode(['status'=>400,'message'=>'Missing required field(s): '.implode(', ', $missing),'data'=>[]]);
    return;
}

$id     = (int)$postvars['id'];
$artist = trim($postvars['artist']);
$date   = trim($postvars['date']);
$hour   = trim($postvars['hour']);
$venue  = trim($postvars['venue']);
$price  = (float)$postvars['price'];

$sql = "UPDATE concerten SET artist=?, date=?, hour=?, venue=?, price=? WHERE id=?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['status'=>500,'message'=>'prepare failed','data'=>[]]);
    return;
}

if (!$stmt->bind_param("ssssdi", $artist, $date, $hour, $venue, $price, $id)) {
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
    'id'=>$id,'artist'=>$artist,'date'=>$date,'hour'=>$hour,'venue'=>$venue,'price'=>$price
  ]]
]);
return;

?>