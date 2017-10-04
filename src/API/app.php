<?php
require 'vendor/autoload.php';
require_once 'check.php';

$app = new \Slim\App();
$app->get('/',function(){
	//echo "string";
	require_once 'index.html';

});
$app->get('/check',function(){
	$check = new Check();
	$json = $check->checke();
	echo $json;

});
$app->run();