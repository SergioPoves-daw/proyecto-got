import { Casa } from "./Casa.js";
import { Guerrero } from "./personajesEspeciales/Guerrero.js";

export class Batalla {

    #muertos = [];
    #supervivientes = [];

    iniciarBatalla(casaA, casaB) {
        // Si ambas son casas y tienen al menos 1 miembro
        if (((casaA instanceof Casa) && casaA.getMiembros.length > 0) && (casaB instanceof Casa && casaB.getMiembros.length > 0)) {
            if (casaA === casaB) {
                console.log("Una casa no puede enfrentarse a sí misma");
                return;
            }

            // Añadir a los arrays solamente los guerreros
            let guerrerosA = casaA.getMiembros.filter(m => m instanceof Guerrero && m.getVivo);
            let guerrerosB = casaB.getMiembros.filter(m => m instanceof Guerrero && m.getVivo);

            // Si ambas casas tienen al menos 1 guerrero, inicia la batalla
            if (guerrerosA.length > 0 && guerrerosB.length > 0) {
                console.log(`Los guerreros que pelearán de la casa ${casaA.nombre} serán los siguientes:`);
                console.log([...guerrerosA]);
            
                console.log(`Los guerreros que pelearán de la casa ${casaB.nombre} serán los siguientes:`);
                console.log([...guerrerosB]);

                // Mientras todos los guerreros de una casa estén vivos, seguirán luchando
                while (guerrerosA.length > 0 && guerrerosB.length > 0) {
                    let muerto = false;

                    console.log(`Nuevo enfrentamiento: ${guerrerosA[0].nombre} vs ${guerrerosB[0].nombre}`);
                    while (!muerto) { // Mientras ambos sigan vivos se seguirán atacando, y cuando muera uno, continuará el siguiente enfrentamiento con el superviviente contra el siguiente guerrero
                        guerrerosA[0].atacar(guerrerosB[0]);

                        if (!guerrerosB[0].vivo) { // Si muere un guerrero de la casaB, se elimina y pasa el siguiente
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida()} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida()}`);
                            this.#muertos.push(guerrerosB[0]);
                            guerrerosB.splice(0, 1); // Pasa al siguiente guerrero
                            muerto = true;
                        }
                        else { // Si sigue vivo, ataca al guerrero de la casaA
                            guerrerosB[0].atacar(guerrerosA[0]);
                        }

                        if (!guerrerosA[0].vivo) { // Si muere un guerrero de la casaA, se elimina y pasa el siguiente
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida()} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida()}`);
                            this.#muertos.push(guerrerosA[0]);
                            guerrerosA.splice(0, 1); // Pasa al siguiente guerrero
                            muerto = true;
                        }
                        // Si sigue vivo, vuelve a atacar
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
                this.mostrarGuerrerosMuertosEnCombate();
                this.mostrarSupervivientes();
            }
            // Si una casa no tiene guerreros
            else {
                console.log("Una de las casas no tiene guerreros");
            }
        }
        // Si la casa no es una Casa o no tiene miembros
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