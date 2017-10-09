<?php
require ("config.php");

function connectDB()
{
    $host = DB_HOST;
    $db   = DB_NAME;
    $user = DB_USER;
    $pass = DB_PASS;
    $charset = 'utf8';
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $opt);
    try {
        $dbh = new PDO($dsn, $user, $pass);
        //echo "Connect ";
    } catch (PDOException $e) {
        die('Подключение не удалось: ' . $e->getMessage());
    }

    return $pdo;
}