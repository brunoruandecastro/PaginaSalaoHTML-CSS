<?php

//$ip = $_SERVER ["SCRIPT_NAME"];

//echo $ip;



$nome = "Bruno";

function teste2() {
   global $nome;
   echo $nome;
}

teste2();



?>

