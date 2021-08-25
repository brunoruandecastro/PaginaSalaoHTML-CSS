<?php
function incluirClasses($nomeClasse){
    if (file_exists($nomeClasse.".php")=== true){
    require_once ($nomeClasse.".php");
}
}
spl_autoload_register ("incluirClasses");

//incluir classes da pasta abstratas
spl_autoload_register(function($nomeClasse){

    if(file_exists("abstratas". DIRECTORY_SEPARATOR .$nomeClasse. ".php")===true){
        require_once("abstratas". DIRECTORY_SEPARATOR .$nomeClasse. ".php");
    }
});
$carro = new Delrey();
$carro->acelerar(222);
$carro->frenar(10);
$carro->trocarMarcha(2);
?>










