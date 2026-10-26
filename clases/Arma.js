export class Arma {
    nombre;
    tipo;
    danio;
    
    constructor(nombre, tipo, danio) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.danio = danio;
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
        this.nombre = nombre;
    }

    set setDanio(danio) {
        this.danio = danio;
    }

    set setTipo(tipo) {
        this.tipo = tipo;
    }

    descripcion() {
        console.log(`${this.nombre} (${this.tipo}) - daño: ${this.danio}`);
    }
}