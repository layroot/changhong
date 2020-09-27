<?php
  include('./lib/conn.php');    
  $sql="select * from changhonggoods";
  $result=$mysqli->query($sql);
  $arr=array();
  while($row = $result->fetch_assoc()){
    array_push($arr,$row);
    };
    $json=json_encode($arr);
    echo $json;

?>
