<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');




define ('INDEX', true);
// --- Step 0 : connect to db
require 'inc/dbcon.php';
require 'inc/base.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	require 'inc/concerten/get.php';
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	require 'inc/concerten/add.php';
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  require '/inc/concerten/edit.php';
  exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
	require 'inc/concerten/delete.php';
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; } 

?>