import { Personaje } from "./Personaje.js";

export class Casa {
    nombre;
    lema;
    miembros;

    constructor(nombre, lema) {
        if (typeof(nombre) == "string") this.nombre = nombre;
        if (typeof(lema) == "string") this.lema = lema;
        this.miembros = [];
    }

    // Getter
    get getNombre() {
        return this.nombre;
    }

    get getLema() {
        return this.lema;
    }

    get getMiembros() {
        return this.miembros;
    }

    // Setter
    set setNombre(nombre) {
        if (typeof(nombre) == "string") this.nombre = nombre;
    }

    set setLema(lema) {
        if (typeof(lema) == "string") this.lema = lema;
    }

    set setMiembro(miembro) {
        if (miembro instanceof Personaje) {
            this.miembros.push(miembro); // Añadir miembro a la casa (array)
            miembro.setCasa = this; // Asignar casa al personaje
        }
    }

    anadirMiembro(miembro) {
        if (miembro instanceof Personaje && !this.miembros.includes(miembro)) {
            this.miembros.push(miembro); // Añadir miembro a la casa (array)
            miembro.setCasa = this; // Asignar casa al personaje
        }
        else {
            console.log(`Miembro no válido`);
        }
    }

    listaMiembros() {
        if (this.miembros.length > 0) {
            console.log(`Miembros de la Casa ${this.nombre}:`);
            this.miembros.forEach(m => console.log(`- ${m.nombre}`));
        }
        else {
            console.log(`La Casa ${this.nombre} no tiene miembros`);
        }
    }
}