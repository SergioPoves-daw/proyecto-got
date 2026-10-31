import { Personaje } from "./../Personaje.js";
import { CaminanteBlanco } from "./CaminanteBlanco.js";

export class Dragon extends Personaje {

    #vida = 200;
    #poder = 0;
    #tipoAtaque = "fuego";

    constructor(nombre, poder, tipoAtaque) {
        super(nombre);
        if (poder > 0) this.#poder = poder;
        if (tipoAtaque.toLowerCase() == "fuego" || tipoAtaque.toLowerCase() == "hielo") this.#tipoAtaque = tipoAtaque.toLowerCase();
        this.vivo = true;
    }
    
    get getVida() {
        return this.#vida;
    }

    get getPoder() {
        return this.#poder;
    }

    get getTipoAtaque() {
        return this.#tipoAtaque;
    }

    set setVida(puntos) {
        if (typeof puntos == "number") this.#vida = puntos;
    }

    set setTipoAtaque(tipo) {
        if (tipo.toLowerCase() == "fuego" || tipo.toLowerCase() == "hielo") this.#tipoAtaque = tipo.toLowerCase();
    }

    atacar(objetivo) {
        let danio;

        // Si el objetivo es un caminante blanco y el dragón ataca con fuego, lo mata al instante;
        if (objetivo instanceof CaminanteBlanco && this.#tipoAtaque == "fuego") {
            danio = objetivo.getVida;
            console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danio} puntos de daño`);
            objetivo.recibirDanio(danio, "fuego");
        }
        else {
            danio = Math.floor(this.#poder * (0.7 + Math.random() * 0.6));
            console.log(`${this.nombre} ataca a ${objetivo.nombre} causando ${danio} puntos de daño`);
            objetivo.recibirDanio(danio);
        }
    }

    recibirDanio(puntos) {
        this.#vida -= puntos;

        if (this.#vida <= 0) {
            this.#vida = 0;
            this.vivo = false;
            this.morir();
        }
    }

    morir() {
        console.log(`El dragón ${this.nombre} ha muerto.`);
    }
}