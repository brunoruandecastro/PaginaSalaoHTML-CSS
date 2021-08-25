<?php

$cliente = array (
    'nome' =>'Ruan',
    'idade' => 20
);


//& passsagem por referência
foreach ($cliente as &$value) {

    if (gettype($value) === 'integer') $value +=10;

    echo $value . '<br>';
}

print_r($cliente);

?>