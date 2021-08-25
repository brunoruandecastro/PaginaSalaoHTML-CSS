<?php


interface Veiculo{

    public function acelerar ($velocidade);
    public function frenar ($velocidade);
    public function trocarMarcha ($marcha);
}

class Civic implements Veiculo {

    public function acelerar($velocidade){

        echo "O veículo acelerou até ". $velocidade . " km/h." ;
        echo "<br/>";
    }
    public function frenar($velocidade){
        echo "O veículo frenou até ". $velocidade . " km/h.";
        echo "<br/>";
    }
    public function trocarMarcha($marcha){
        echo "O veiculo engatou a ". $marcha."ª marcha.";
        echo "<br/>";
    }

}

$carro = new Civic();

$carro->trocarMarcha(2);

$carro->acelerar(150);

$carro->frenar(50);

?>