import { Personaje } from './../Personaje.js';
import { Consejero } from './Consejero.js';

export class Khaleesi extends Personaje {
    
    #dragones = [];
    #consejero;
    
    constructor(nombre, edad, casa, dragones, consejero) {
        super(nombre, edad, casa);
        if (dragones.length === 3 && dragones instanceof Dragon) this.#dragones = dragones;
        if (consejero instanceof Consejero) this.#consejero = consejero;
    }
}