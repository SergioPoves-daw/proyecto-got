import { Personaje } from "./../Personaje.js";
import { Arma } from "./../Arma.js";
import { CaminanteBlanco } from "./CaminanteBlanco.js";

export class Guerrero extends Personaje {
    arma;
    #vida = 100;

    constructor(nombre, edad, casa, arma) {
        super(nombre, edad, casa);
        if (arma instanceof Arma) this.arma = arma;
    }

    get getArma() {
        return this.arma;
    }

    get getVida() {
        return this.#vida;
    }

    set setArma(arma) {
        if (arma instanceof Arma) this.arma = arma;
    }

    set setVida(puntos) {
        if (typeof puntos == "number") this.vida = puntos;
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
        if (objetivo instanceof Guerrero || objetivo instanceof CaminanteBlanco) {
            if ((objetivo instanceof CaminanteBlanco) && !(this.arma.getTipo == "acero valyrio")) {
                console.log(`${objetivo.nombre} es inmune al ataque de ${this.nombre}.`);
                return;
            };
            let danio = Math.floor(this.arma.danio * (0.7 + Math.random() * 0.6));
            console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danio} puntos de daño`);

            if (objetivo instanceof CaminanteBlanco) objetivo.recibirDanio(danio, this.arma.getTipo.toLowerCase());
            else objetivo.recibirDanio(danio);
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