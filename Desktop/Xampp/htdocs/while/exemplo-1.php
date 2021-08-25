<?php

$condicao = true;

while ($condicao) {

    $numero = rand(1, 50);

    if ($numero === 3) {

        echo "NÚMERO SORTEADO!";
        $condicao = false;

    }

    echo $numero . " ";

}

?>