import { Rey } from "./personajesEspeciales/Rey.js";
import { Casa } from "./Casa.js";

export class Reino {
    nombre;
    casas;
    rey;

    constructor(nombre, rey) {
        if (typeof(nombre) == "string") this.nombre = nombre;
        this.casas = [];
        if (rey instanceof Rey) this.rey = rey;
    }

    // Getter
    get getNombre() {
        return this.nombre;
    }

    get getCasas() {
        return this.casas;
    }

    get getRey() {
        return this.rey;
    }

    // Setter
    set setNombre(nombre) {
        if (typeof(nombre) == "string") this.nombre = nombre;
    }

    set setCasa(casa) {
        if (casa instanceof Casa && !this.casas.includes(casa)) this.casas.push(casa); // Añadir casa al reino (array)
    }

    set setRey(rey) {
        if (rey instanceof Rey) this.rey = rey;
    }

    anadirCasa(casa) {
        if (casa instanceof Casa && !this.casas.includes(casa)) {
            this.casas.push(casa); // Añadir casa al reino (array)
            console.log(`La Casa ${casa.nombre} ha sido añadida al Reino de ${this.nombre}.`);
        }
        else {
            console.log(`Casa no válida`);
        }
    }

    proclamarRey(rey) {
        if (rey instanceof Rey) {
            this.rey = rey;
            console.log(`${rey.nombre} ha sido proclamado rey de ${this.nombre}.`);
        }
        else {
            console.log(`${rey.nombre} no es un Rey.`);
        }
    }

    listarCasas() {
        if (this.casas.length > 0) {
            console.log(`Casas del Reino de ${this.nombre}:`);
            this.casas.forEach(c => {
                console.log(`- ${c.nombre}`); // Por cada casa, muestra el nombre (- Casa)
            })
        }
        else {
            console.log(`El reino ${this.nombre} no tiene casas.`);
        }
    }

    informacionRey() {
        if (this.rey) {
            console.log("Rey actual:");
            console.log(`El rey actual es ${this.rey.nombre} de la Casa ${this.rey.getCasa}`);
        }
        else {
            console.log(`El reino ${this.nombre} no tiene rey.`);
        }
    }
}