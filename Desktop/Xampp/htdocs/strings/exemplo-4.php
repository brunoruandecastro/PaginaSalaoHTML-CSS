<?php

$frase = "Ser uma pessoa boa gasta mais energia."; 
$palavra = "boa";

$q = strpos ($frase, $palavra);

$texto = substr ($frase, 0, $q);

var_dump ($texto);

$texto2 = substr($frase, $q + strlen ($palavra), strlen($frase));
echo "<br>";
var_dump ($texto2);

?>