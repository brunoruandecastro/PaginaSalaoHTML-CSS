<?php
//conexão com o banco
$conn = new mysqli("localhost","root","BrU-nO-9102-3644","aula");

//conferir se aconteceu algum erro
if ($conn->connect_error){
    echo "Error: " . $conn->connect_error;
}
$stmt = $conn->prepare("INSERT INTO tb_usuarios(deslogin,dessenha)VALUES(?,?)");
//parametros string e string
$stmt->bind_param("ss",$login,$pass);

$login = "user";
$pass = "12345";

$stmt->execute();

$login = "bruninho";
$pass  = "eraumavez123";

$stmt->execute();

?>