import { Personaje } from "./../Personaje.js";

export class Rey extends Personaje {
    aniosReinado;

    constructor(nombre, edad, casa, aniosReinado) {
        super(nombre, edad, casa);
        this.aniosReinado = aniosReinado;
    }

    get getAniosReinado() {
        return this.aniosReinado;
    }

    set setAniosReinado(anios) {
        this.aniosReinado = anios;
    }

    gobernar() {
        console.log(`${this.nombre} gobierna con sabiduría desde hace ${this.aniosReinado} años.`);
    }

    luchar() {
        console.log(`${this.nombre} lidera la batalla y anima a sus tropas.`);
    }
}