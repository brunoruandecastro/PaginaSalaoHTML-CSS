<?php

//$ts = strtotime ("2001-06-25");
$ts = strtotime ("+15 day, 25 hours");

echo date ("l, d/m/Y h:i:s", $ts);



?>