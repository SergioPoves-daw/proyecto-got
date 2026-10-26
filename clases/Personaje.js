export class Personaje {
    nombre;
    edad;
    vivo;
    casa;

    constructor(nombre, edad, casa) {
        this.nombre = nombre;
        this.edad = edad;
        this.vivo = true;
        this.casa = casa;
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
        this.nombre = nombre;
    }

    set setEdad(edad) {
        this.edad = edad;
    }

    set setVivo(vivo) {
        this.vivo = vivo;
    }

    set setCasa(casa) {
        this.casa = casa;
    }

    asignarCasa(casa) {
        this.casa = casa;
        console.log(`${this.nombre} ha sido añadido a la Casa ${casa.nombre}`);
    }

    presentacion() {
        console.log(`Soy ${this.nombre} de la Casa ${this.casa.nombre}`);
    }
}