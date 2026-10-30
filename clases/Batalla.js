import { Casa } from "./Casa.js";
import { Personaje } from "./Personaje.js";
import { CaminanteBlanco } from "./personajesEspeciales/CaminanteBlanco.js";
import { Dragon } from "./personajesEspeciales/Dragon.js";
import { Guerrero } from "./personajesEspeciales/Guerrero.js";
import { Khaleesi } from "./personajesEspeciales/Khaleesi.js";

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
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida}`);
                            this.#muertos.push(guerrerosB[0]);
                            guerrerosB.splice(0, 1); // Pasa al siguiente guerrero
                            muerto = true;
                        }
                        else { // Si sigue vivo, ataca al guerrero de la casaA
                            guerrerosB[0].atacar(guerrerosA[0]);
                        }

                        if (!guerrerosA[0].vivo) { // Si muere un guerrero de la casaA, se elimina y pasa el siguiente
                            console.log(`${guerrerosA[0].nombre}: ${guerrerosA[0].getVida} | ${guerrerosB[0].nombre}: ${guerrerosB[0].getVida}`);
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

    batallaFinal(casa, khaleesi, caminantes) {
        if (caminantes.length <= 0  || !caminantes.every(c => c instanceof CaminanteBlanco)) {
            console.log("No hay caminantes blancos que vayan a luchar");
            return;
        }

        if (!(khaleesi instanceof Khaleesi)) {
            console.log("El ejército necesita a Khaleesi");
            return;
        }

        if (casa instanceof Casa && casa.getMiembros.length > 0) {
            // Añadir a los arrays solamente los guerreros
            let guerreros = casa.getMiembros.filter(m => m instanceof Guerrero && m.getVivo);

            if (guerreros.length <= 0) {
                console.log("Esta casa no tiene guerreros");
                return;
            }

            let noCaminante;
            let dragon;
            
            while ((guerreros.length > 0 || khaleesi.getDragones.length > 0) && caminantes.length > 0) {
                let muerto = false;
                if (khaleesi.getDragones.length > 0) {
                    dragon = khaleesi.getDragones[0];
                }

                if (guerreros.length > 0) {
                    noCaminante = guerreros[0];
                }
                else {
                    noCaminante = dragon;
                }

                console.log(`Nuevo enfrentamiento: ${noCaminante.nombre} vs ${caminantes[0].nombre}`);
                while (!muerto) { // Mientras ambos sigan vivos se seguirán atacando, y cuando muera uno, continuará el siguiente enfrentamiento con el superviviente contra el siguiente guerrero
                    noCaminante.atacar(caminantes[0]);
                    
                    // Si el caminante sobrevive al ataque, hay probabilidad de que un dragón lo remate
                    if (caminantes[0].getVivo) {
                        let random = Math.floor(Math.random() * 10);
                        if (random == 1) {
                            dragon.atacar(caminantes[0]);
                        }
                    }

                    // Si muere un caminante, se elimina y pasa el siguiente
                    if (!caminantes[0].vivo) { 
                        console.log(`${noCaminante.nombre}: ${noCaminante.vida} | ${dragon.nombre}: ${dragon.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);
                        this.#muertos.push(caminantes[0]);
                        caminantes.shift(); // Pasa al siguiente caminante
                        muerto = true;
                    }

                    // Si sigue vivo, ataca al guerrero y al dragon
                    else { 
                        caminantes[0].atacar(guerreros[0]);

                        // Si hay algún dragón vivo, ataca
                        if (khaleesi.getDragones.length > 0) caminantes[0].atacar(dragon);
                    }

                    // Si muere un guerrero o dragón, se vuelve un Caminante Blanco
                    if (!noCaminante.vivo) {
                        console.log(`${noCaminante.getNombre} es ahora un Caminante Blanco.`);
                        console.log(`${noCaminante.getNombre}: ${noCaminante.vida} | ${dragon.getNombre}: ${dragon.getVida} | ${caminantes[0].getNombre}: ${caminantes[0].getVida}`);
                        
                        let caminante;

                        // Se asigna la fuerza del caminante según si el muerto es un guerrero o un dragón
                        if (noCaminante instanceof Guerrero) caminante = new CaminanteBlanco(noCaminante.getNombre, noCaminante.getArma.getDanio);
                        else if (noCaminante instanceof Dragon) caminante = new CaminanteBlanco(noCaminante.getNombre, noCaminante.getPoder);

                        // caminantes.unshift(caminante); // Añade el nuevo caminante al ejército de caminantes
                        this.#muertos.push(noCaminante);
                        muerto = true;

                        // Si el muerto era un guerrero, se elimina al guerrero y le sigue el siguiente si quedan más
                        // Si el muerto era un dragón, se elimina al dragón y le sigue el siguiente si quedan más
                        if (guerreros.length > 0) guerreros.shift(); // Pasa al siguiente guerrero
                        else if (khaleesi.getDragones.length > 0) khaleesi.getDragones.shift();
                    }

                    // Si aún hay dragones y el dragón actual está muerto, se elimina
                    if (khaleesi.getDragones.length > 0 && !khaleesi.getDragones[0].getVivo) {
                        khaleesi.getDragones.shift();
                    }
                    // Si sigue vivo, vuelve a atacar
                }
                console.log("--------------------");
            }

            if (guerreros.length > 0) {
                console.log(`La batalla ha sido ganada por la Casa ${casa.getNombre}.`);
            }
            else if (caminantes.length > 0) {
                console.log(`La batalla ha sido ganada por los Caminantes Blancos.`);
            }
        }

        else {
            console.log(`La Casa ${casa.nombre} no tiene miembros.`);
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