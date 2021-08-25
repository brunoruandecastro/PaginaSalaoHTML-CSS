<?php
//contador

for ($c = 0; $c < 200; $c++) {

    if ($c > 150 && $c < 170) continue;
    if ($c === 190) break;
    
    echo $c . "<br>";

}

?>