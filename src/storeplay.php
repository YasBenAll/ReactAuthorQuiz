<?php
require_once('connection.php');
mysqli_select_db($sql_connect, $connect["play"]);
$q = mysql_query("select DISTINCT count(*) from wp_gm1_locations");
?>

<html>  
    <div>
        <?php echo $q['id'] ?>
    <div>
<html>  