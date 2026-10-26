import { Personaje } from "./../Personaje.js";

export class Consejero extends Personaje {
    especialidad;

    constructor(nombre, edad, casa, especialidad) {
        super(nombre, edad, casa);
        this.especialidad = especialidad;
    }

    set setEspecialidad(especialidad) {
        this.especialidad = especialidad;
    }
    
    get getEspecialidad() {
        return this.especialidad;
    }

    luchar() {
        console.log(`${this.nombre} no lucha con armas, sino con palabras e inteligencia.`);
    }

    aconsejar(personaje) {
        console.log(`${this.nombre} aconseja a ${personaje.nombre} sobre ${this.especialidad}`);
    }
}