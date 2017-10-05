<?php
require 'vendor/autoload.php';
require_once 'check.php';

$app = new \Slim\App();
$app->get('/',function(){
	require_once 'index.html';

});
$app->get('/check',function(){
	$check = new Check();
	$json = $check->checke();
	echo $json;

});
$app->get('/check/progress',function(){
	session_start();
	echo $_SESSION['count'];
	session_write_close();
});
$app->run();