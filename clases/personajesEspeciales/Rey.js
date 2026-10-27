import { Personaje } from "./../Personaje.js";

export class Rey extends Personaje {
    aniosReinado;

    constructor(nombre, edad, casa, aniosReinado) {
        super(nombre, edad, casa);
        if (typeof(aniosReinado) == "number") this.aniosReinado = aniosReinado;
    }

    get getAniosReinado() {
        return this.aniosReinado;
    }

    set setAniosReinado(anios) {
        if (typeof(anios) == "number") this.aniosReinado = anios;
    }

    gobernar() {
        if (this.aniosReinado) console.log(`${this.nombre} gobierna con sabiduría desde hace ${this.aniosReinado} años.`);
        else console.log(`No se sabe cuántos años lleva ${this.nombre} reinando`);
    }

    luchar() {
        console.log(`${this.nombre} lidera la batalla y anima a sus tropas.`);
    }
}