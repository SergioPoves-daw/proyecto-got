export class Personaje {
    nombre;
    edad;
    vivo;
    casa;
    arma;

    constructor(nombre, edad, casa, arma) {
        this.nombre = nombre;
        this.edad = edad;
        this.vivo = true;

        if (casa) {
            this.casa = casa; // Si se introduce una casa en el constructor, asignarla al personaje
            console.log(`${this.nombre} ha sido añadido a la Casa ${casa.nombre}`);
        }

        if (arma) {
            this.arma = arma; // Si se introduce un arma en el constructor, asignarla al personaje
            console.log(`${this.nombre} ha equipado el arma ${arma.nombre}`);
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

    get getArma() {
        return this.arma;
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
        console.log(`${this.nombre} ha sido añadido a la Casa ${casa.nombre}`);
    }

    set setArma(arma) {
        this.arma = arma;
        console.log(`${this.nombre} ha equipado el arma ${arma.nombre}`);
    }

    presentacion() {
        console.log(`Soy ${this.nombre} de la Casa ${this.casa.nombre}`);
    }
}