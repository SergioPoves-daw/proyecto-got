import { Personaje } from "./../Personaje.js";
import { Arma } from "./../Arma.js";

export class CaminanteBlanco extends Personaje {

    #vida = 100;
    #poderHelado;

    constructor(nombre, poderHelado) {
        super(nombre);
        this.#poderHelado = poderHelado;
    }

    atacar(objetivo) {
        let danio = Math.floor(this.#poderHelado * (0.7 + Math.random() * 0.6));
        console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danio} puntos de daño`);
        objetivo.recibirDanio(danio);
    }

    recibirDanio(puntos, arma) {
        if (arma instanceof Arma && arma.tipo.toLowerCase() == "acero valyrio") {
            this.#vida =- puntos;
        }

        if (this.#vida <= 0) {
            this.#vida = 0;
            this.vivo = false;
            this.morir();
        }
    }

    morir() {
        console.log(`El caminante blanco ${this.nombre} ha muerto.`);
    }
}