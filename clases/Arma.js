export class Arma {
    nombre;
    tipo;
    danio;
    
    constructor(nombre, danio, tipo) {
        if (typeof nombre == "string") this.nombre = nombre;
        if (typeof danio == "number") this.danio = danio;
        if (typeof tipo == "string") this.tipo = tipo;
    }

    // Getter
    get getNombre() {
        return this.nombre;
    }

    get getDanio() {
        return this.danio;
    }
    
    get getTipo() {
        return this.tipo;
    }

    // Setter
    set setNombre(nombre) {
        if (typeof(nombre) == "string") this.nombre = nombre;
    }

    set setDanio(danio) {
        if (typeof(danio) == "number") this.danio = danio;
    }

    set setTipo(tipo) {
        if (typeof(tipo) == "string") this.tipo = tipo;
    }

    descripcion() {
        console.log(`${this.nombre} (${this.tipo}) - daño: ${this.danio}`);
    }
}