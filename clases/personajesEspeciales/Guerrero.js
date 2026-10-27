import { Personaje } from "./../Personaje.js";
import { Arma } from "./../Arma.js";

export class Guerrero extends Personaje {
    arma;

    constructor(nombre, edad, casa, arma) {
        super(nombre, edad, casa);
        if (arma instanceof Arma) this.arma = arma;
    }

    getArma() {
        return this.arma;
    }

    setArma(arma) {
        if (arma instanceof Arma) this.arma = arma;
    }

    asignarArma(arma) {
        if (arma instanceof Arma) {
            this.arma = arma;
            console.log(`${this.nombre} ha equipado el arma ${arma.nombre}.`);
        }
        else {
            console.log("Arma no válida");
        }
    }

    luchar() {
        if (this.arma) console.log(`${this.nombre} ataca con su ${this.arma.nombre}, causando ${this.arma.danio} puntos.`);
    }

    entrenar() {
        console.log(`${this.nombre} se entrena sin descanso para la próxima batalla.`);
    }
}