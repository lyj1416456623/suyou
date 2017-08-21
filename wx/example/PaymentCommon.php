<?php

class Config {

    public static $servername = "localhost";
    public static $username = "root";
    public static $password = "fm2016@fm";
    public static $dbname = "freshmart";

}

class OrderUpdateUtil {

    public static function update_order($data) {
        $order_code = $data['out_trade_no'];
        
        //$order_code = '384756078';
        OrderUpdateUtil::by_sql_($order_code);
    
    }

    private static function by_sql_($order_code) {
// Create connection
        $conn = new mysqli(Config::$servername, Config::$username, Config::$password, Config::$dbname);
// Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "UPDATE `order` SET status=3 WHERE order_code=" . $order_code . " and status in (1,14)";
        if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
            die();
        }

        $conn->close();
    }

}
