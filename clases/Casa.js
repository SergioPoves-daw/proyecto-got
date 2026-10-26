export class Casa {
    nombre;
    lema;
    miembros;

    constructor(nombre, lema) {
        this.nombre = nombre;
        this.lema = lema;
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
        this.nombre = nombre;
    }

    set setLema(lema) {
        this.lema = lema;
    }

    set setMiembro(miembro) {
        this.miembros.push(miembro); // Añadir miembro a la casa (array)
        miembro.setCasa = this; // Asignar casa al personaje
    }

    listaMiembros() {
        console.log(`Miembros de la Casa ${this.nombre}:`);
        this.miembros.forEach(m => console.log(`- ${m.nombre}`));
    }
}