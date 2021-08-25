<?php

$anosProgramando = 2;

$programadorEstagiario = 2;
$programadorJunior = 5;
$programadorSenior = 15;

if ($anosProgramando <= $programadorEstagiario){
    echo "Estagiário";
}

else if ($anosProgramando <= $programadorJunior){
    echo "Junior";
}

else if ($anosProgramando <= $programadorSenior){
    echo "Senior";
}

else {
    echo "Expert";
}

echo "<br>";

echo ($anosProgramando < $programadorSenior)?"Pouco Experiente":"Experiente";


?>