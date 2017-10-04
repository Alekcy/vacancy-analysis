<?php
require 'vendor/autoload.php';
require_once 'check.php';

$app = new \Slim\App();
$app->get('/',function(){
	require_once 'index.html';

});
$app->get('/check',function(){
	$check = new Check();
	$check->check();
});
$app->run();