<?php

function boasVindas (){

    $argumentos = func_get_args();

    return $argumentos;
}

var_dump (boasVindas("Boa noite, queridos!", 10, 55));


?>