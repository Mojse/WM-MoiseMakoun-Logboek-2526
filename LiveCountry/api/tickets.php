<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define ('INDEX', true);
// --- Step 0 : connect to db
require 'inc/dbcon.php';
require 'inc/base.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['bezoeker_id']) && ctype_digit($_GET['bezoeker_id'])) {
    require __DIR__ . '/inc/tickets/getBezoekerConcerten.php';
  } elseif (isset($_GET['concert_id']) && ctype_digit($_GET['concert_id'])) {
    require __DIR__ . '/inc/tickets/getConcertBezoekers.php';
  } else {
    http_response_code(400);
    echo json_encode(['status'=>400,'error'=>'Missing bezoeker_id or concert_id']);
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { require __DIR__ . '/inc/tickets/add.php'; exit; }

echo json_encode(['status'=>405,'message'=>'Method Not Allowed','data'=>[]]);
exit;

?>