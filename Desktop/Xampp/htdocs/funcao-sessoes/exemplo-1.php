<?php

session_start();

echo session_save_path();

echo "<br>";

var_dump(session_status());

echo "<br>";

switch (session_status()) {
    case PHP_SESSION_DISABLED;
    echo "as sessões estiverem desabilitadas";
    break;

    case PHP_SESSION_NONE;
    echo "as sessões estiverem habilitadas, mas nem uma existir";
    break;

    case PHP_SESSION_ACTIVE;
    echo "as sessões estiverem habilitadas, e uma existir";
    break;
}
//para apagar a variavel de sessão
// session_unset($_SESSION['nome']);

//limpa a variavel e remove o úsuario
//session_destroy ();

?>