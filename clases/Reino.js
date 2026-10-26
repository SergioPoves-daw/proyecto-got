export class Reino {
    nombre;
    casas;
    rey;

    constructor(nombre, rey) {
        this.nombre = nombre;
        this.casas = [];
        this.rey = rey;
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
        this.nombre = nombre;
    }

    set setCasa(casa) {
        this.casas.push(casa); // Añadir casa al reino (array)
        console.log(`La Casa ${casa.nombre} ha sido añadida al Reino de ${this.nombre}`);
    }

    set setRey(rey) {
        this.rey = rey;
        console.log(`${rey.nombre} ha sido proclamado rey de ${this.nombre}`);
    }

    listarCasas() {
        console.log(`Casas del Reino de ${this.nombre}:`);
        this.casas.forEach(c => {
            console.log(`- ${c.nombre}`); // Por cada casa, muestra el nombre (- Casa)
        })
    }

    informacionRey() {
        console.log("Rey actual:");
        console.log(`El rey actual es ${this.rey.nombre} de la Casa ${this.rey.getCasa}`);
    }
}