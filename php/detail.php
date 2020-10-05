<?php
  include('./lib/conn.php');    
  $sid=$_GET['sid'];
  $sql="select * from changhonggoods where sid=$sid";
  $result=$mysqli->query($sql);

  $arr=array();
  while($row = $result->fetch_assoc()){
    array_push($arr,$row);
    };
    $json=json_encode($arr);
    echo $json;

?>
