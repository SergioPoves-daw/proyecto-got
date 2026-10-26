import { Personaje } from "./../Personaje.js";

export class Guerrero extends Personaje {
    arma;

    constructor(nombre, edad, casa, arma) {
        super(nombre, edad, casa);
        this.arma = arma;
    }

    getArma() {
        return this.arma;
    }

    setArma(arma) {
        this.arma = arma;
    }

    asignarArma(arma) {
        this.arma = arma;
        console.log(`${this.nombre} ha equipado el arma ${arma.nombre}.`);
    }

    luchar() {
        console.log(`${this.nombre} ataca con su ${this.arma.nombre}, causando ${this.arma.danio} puntos.`);
    }

    entrenar() {
        console.log(`${this.nombre} se entrena sin descanso para la próxima batalla.`);
    }
}