<?php

class Carro{

    private $modelo;
    private $motor;
    private $ano;

    public function getModelo(){

        return $this->modelo;

    }
    
    public function setModelo($modelo){

        $this->modelo = $modelo; 

    }

    public function getMotor():float{

        return $this->motor;

    } 

    public function setMotor($motor){

        $this->motor = $motor; 
    }


    public function getAno():int{

        return $this->ano;

    }

    public function setAno($ano){

        $this->ano = $ano;

    }

    public function exibir(){

        return array(

            "Modelo"=>$this->getModelo(),
            "Motor"=>$this->getMotor(),
            "Ano"=>$this->getAno()

        );
    }

}

$golzinho = new Carro();
$golzinho->setModelo("Gol GT");
$golzinho->setMotor("1.5");
$golzinho->setAno("2021");

var_dump ($golzinho->exibir());

?>