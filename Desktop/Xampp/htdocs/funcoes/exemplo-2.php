<?php 

function boasVindas ($periodo = "bom dia",$horario = "10:33"){

    return "Olá, $periodo! Agora são:$horario <br>";

}

echo boasVindas ("garoto", "");
echo boasVindas ();
echo boasVindas ("menina", "10:39");



?>