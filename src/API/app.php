<?php
require 'vendor/autoload.php';
require 'router.php';
$app = new \Slim\App();
$app->get('/',function(){
	require 'index.html';
});
$app->run();