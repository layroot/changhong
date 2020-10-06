<?php
include('./lib/conn.php');
$idList=$_REQUEST['idList'];
$sql="select * from changhonggoods where sid in ($idList)";
$res=$mysqli->query($sql);
$mysqli->close();
$arr=array();
while($row=$res->fetch_assoc()){
    array_push($arr,$row);
}
$json=json_encode($arr);
echo $json;
?>