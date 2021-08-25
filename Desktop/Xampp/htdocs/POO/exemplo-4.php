<?php

class Endereco {

    private $logradouro;
    private $numero;
    private $cidade;


public function __construct($a, $b, $c){

    $this->logradouro = $a;
    $this->numero = $b;
    $this->cidade = $c;
}
    public function __destruct(){

        //var_dump("Destruido");
    }
public function __toString(){

    return $this->logradouro. ", " .$this->numero. " - " .$this->cidade;

}
}

$meuEndereco = new Endereco("Rua Dorival Gabriel Bandeira", "345", "Santo Antonio do Sudoeste");

echo $meuEndereco;

//var_dump ($meuEndereco);

//unset ($meuEndereco);

?>