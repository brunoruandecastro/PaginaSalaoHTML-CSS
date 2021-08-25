<?php

$dt = new DateTime();

$frete = new DateInterval("P20D");

echo $dt-> format ("d/m/Y H:i:s");

$dt-> add($frete);

echo "<br>";

echo $dt-> format("d/m/Y H:i:s");


?>