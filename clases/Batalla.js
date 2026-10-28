import { Casa } from "./Casa.js";
import { Guerrero } from "./personajesEspeciales/Guerrero.js";

export class Batalla {

    #muertos = [];
    #supervivientes = [];

    iniciarBatalla(casaA, casaB) {
        if (((casaA instanceof Casa) && casaA.getMiembros.length > 0) && (casaB instanceof Casa && casaB.getMiembros.length > 0)) {
            if (casaA === casaB) {
                console.log("Una casa no puede enfrentarse a sí misma");
            }
            let guerrerosA = [];
            let guerrerosB = [];

            casaA.getMiembros.forEach(m => {
                if (m instanceof Guerrero) {
                    guerrerosA.push(m);
                } 
            })

            casaB.getMiembros.forEach(m => {
                if (m instanceof Guerrero) {
                    guerrerosB.push(m);
                }
            })

            if (guerrerosA.length > 0 && guerrerosB.length > 0) {
                console.log(`Los guerreros que pelearán de la casa ${casaA.nombre} serán los siguientes:`);
                console.log(guerrerosA);
            
                console.log(`Los guerreros que pelearán de la casa ${casaB.nombre} serán los siguientes:`);
                console.log(guerrerosB);

                while (guerrerosA.length > 0 && guerrerosB.length > 0) {
                    let muerto = false;

                    console.log(`Nuevo enfrentamiento: ${guerrerosA[0].nombre} vs ${guerrerosB[0].nombre}`);
                    while (!muerto) {
                        guerrerosA[0].atacar(guerrerosB[0]);

                        if (!guerrerosB[0].vivo) {
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida()} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida()}`);
                            this.#muertos.push(guerrerosB[0]);
                            guerrerosB.splice(0, 1);
                            muerto = true;
                        }
                        else {
                            guerrerosB[0].atacar(guerrerosA[0]);
                        }

                        if (!guerrerosA[0].vivo) {
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida()} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida()}`);
                            this.#muertos.push(guerrerosA[0]);
                            guerrerosA.splice(0, 1);
                            muerto = true;
                        }
                    }
                    console.log("--------------------");
                }

                if (guerrerosA.length > 0) {
                    console.log(`La batalla ha sido ganada por la Casa ${casaA.nombre}`);
                    guerrerosA.forEach(g => {
                        this.#supervivientes.push(g);
                    });
                }
                else if (guerrerosB.length > 0) {
                    console.log(`La batalla ha sido ganada por la Casa ${casaB.nombre}`);
                    guerrerosB.forEach(g => {
                        this.#supervivientes.push(g);
                    });
                }
            }
            else {
                console.log("Una de las casas no tiene guerreros");
            }
        }
        else {
            console.log("Casa no válida o no tiene miembros.");
        }
    }

    mostrarGuerrerosMuertosEnCombate() {
        console.log("Guerreros muertos en combate:");
        console.log(this.#muertos);
    }

    mostrarSupervivientes() {
        console.log("Supervivientes:");
        console.log(this.#supervivientes);
    }
}