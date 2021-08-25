<?php

function soma(int ... $valores):string{

    return array_sum($valores);
}

echo var_dump (soma(2,4));
echo "<br>";
echo var_dump (soma(25,24));
echo "<br>";
echo (soma(1.32, 1.42));
echo "<br>";


?>