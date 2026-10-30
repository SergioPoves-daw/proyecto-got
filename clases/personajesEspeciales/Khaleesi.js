import { Personaje } from './../Personaje.js';
import { Consejero } from './Consejero.js';
import { Dragon } from './Dragon.js';

export class Khaleesi extends Personaje {
    
    #dragones = [];
    #consejero;
    
    constructor(nombre, edad, casa, dragones, consejero) {
        super(nombre, edad, casa);
        if (this.#validarDragones(dragones)) this.#dragones = dragones;
        if (consejero instanceof Consejero) this.#consejero = consejero;
    }

    #validarDragones(dragones) {
        let c = 0;

        dragones.forEach(d => {
            if (d instanceof Dragon) c++;
        });

        if (c === 3) return true;
        else return false;
    }

    get getDragones() {
        return this.#dragones;
    }

    get getConsejero() {
        return this.#consejero;
    }

    set setDragones(dragones) {
        if (dragones.length === 3 && dragones.every(d => d instanceof Dragon)) this.#dragones = dragones;
    }
    
    set setConsejero(consejero) {
        if (consejero instanceof Consejero) {
            this.#consejero = consejero;
        }
    }
}