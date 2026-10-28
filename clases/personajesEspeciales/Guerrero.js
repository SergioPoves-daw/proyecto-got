import { Personaje } from "./../Personaje.js";
import { Arma } from "./../Arma.js";

export class Guerrero extends Personaje {
    arma;
    #vida = 100;

    constructor(nombre, edad, casa, arma) {
        super(nombre, edad, casa);
        if (arma instanceof Arma) this.arma = arma;
    }

    getArma() {
        return this.arma;
    }

    getVida() {
        return this.#vida;
    }

    setArma(arma) {
        if (arma instanceof Arma) this.arma = arma;
    }

    setVida(puntos) {
        if (typeof(puntos) == "number") this.#vida = puntos;
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

    atacar(objetivo) {
        if (objetivo instanceof Guerrero) {
            let danio = Math.floor(this.arma.danio * (0.7 + Math.random() * 0.6));
            console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danio} puntos de daño`);
            objetivo.recibirDanio(danio);
        }
        else {
            console.log(`${objetivo.nombre} no es un Guerrero.`);
        }
    }

    recibirDanio(puntos) {
        this.#vida -= puntos;

        if (this.#vida <= 0) {
            this.#vida = 0;
            this.vivo = false;
            this.morir();
        }
    }

    morir() {
        console.log(`${this.nombre} ha muerto.`);
    }
}