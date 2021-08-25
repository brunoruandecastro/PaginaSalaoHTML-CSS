<?php

class Pessoa{

    public $nome;//Atributo: variavel que ganha mais erecursos

    public function falar(){ //Método: função que ganha mais recursos - é a ação
        
        return "O meu nome é" .$this -> nome;
    }
}
//objeto
$bruno = new Pessoa();

$bruno->nome = " Bruno Ruan";
echo $bruno->falar();






?>