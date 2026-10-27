import { Personaje } from "./../Personaje.js";

export class Consejero extends Personaje {
    especialidad;

    constructor(nombre, edad, casa, especialidad) {
        super(nombre, edad, casa);
        if (typeof(especialidad) == "string") this.especialidad = especialidad;
    }
    
    get getEspecialidad() {
        return this.especialidad;
    }

    set setEspecialidad(especialidad) {
        if (typeof(especialidad) == "string") this.especialidad = especialidad;
    }

    luchar() {
        console.log(`${this.nombre} no lucha con armas, sino con palabras e inteligencia.`);
    }

    aconsejar(personaje) {
        if (this.especialidad) console.log(`${this.nombre} aconseja a ${personaje.nombre} sobre ${this.especialidad}`);
        else console.log(`El consejero ${this.nombre} no tiene especialidad`);
    }
}