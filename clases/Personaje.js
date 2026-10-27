import { Casa } from "./Casa.js";

export class Personaje {
    nombre;
    edad;
    vivo;
    casa;

    constructor(nombre, edad, casa) {
        if (typeof(nombre) == "string") this.nombre = nombre;
        if (typeof(edad) == "number") this.edad = edad;
        this.vivo = true;
        if (casa && casa instanceof Casa) {
            this.casa = casa;
            casa.anadirMiembro(this);
        }
    }

    // Getter
    get getNombre() {
        return this.nombre;
    }

    get getEdad() {
        return this.edad;
    }

    get getVivo() {
        return this.vivo;
    }

    get getCasa() {
        if (!this.casa) {
            console.log(`${this.nombre} no tiene casa`);
            return null
        }
        return this.casa.nombre;
    }

    // Setter
    set setNombre(nombre) {
        if (typeof(nombre) == "string") this.nombre = nombre;
    }

    set setEdad(edad) {
        if (typeof(edad) == "number") this.edad = edad;
    }

    set setVivo(vivo) {
        if (typeof(vivo) == "boolean") this.vivo = vivo;
    }

    set setCasa(casa) {
        if (casa instanceof Casa) this.casa = casa;
    }

    asignarCasa(casa) {
        if (casa instanceof Casa) {
            this.casa = casa;
            console.log(`${this.nombre} ha sido añadido a la Casa ${casa.nombre}`);
        }
        else {
            console.log("Casa no válida");
        }
    }

    presentacion() {
        if (this.casa) {
            console.log(`Soy ${this.nombre} de la Casa ${this.casa.nombre}`);
        }
    }
}