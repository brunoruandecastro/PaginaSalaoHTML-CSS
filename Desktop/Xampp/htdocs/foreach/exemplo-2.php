<form>

    <input type="name" name="nome">
    <input type="date" name="nascimento">
    <input type="submit" value="OK">

</form>

<?php

//if (isset($_GET)) {

    foreach ($_GET as $key => $value) {

        echo "Dados: " . $key . "<br>";

        echo "Valor de cadastro: " . $value;

        echo "<hr>";

    }

//}

?>