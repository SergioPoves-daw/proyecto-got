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
                console.log(`La Casa ${casa.nombre} no tiene guerreros`);
                return;
            }

            let noCaminante; // Asignar guerreros, y posteriormente dragones cuando no queden guerreros vivos
            let dragon; // Asignar dragón de apoyo
            
            // Mientras los guerreros o los dragones de Khaleesi sigan vivos, y los caminantes sigan vivos, seguirán enfrentándose
            while ((guerreros.length > 0 || khaleesi.getDragones.length > 0) && caminantes.length > 0) {
                let muerto = false;

                // Si aún hay dragones, el dragón vivo será el apoyo, si no, será null
                if (khaleesi.getDragones.length > 0) {
                    dragon = khaleesi.getDragones[0];
                }
                else {
                    dragon = null;
                }

                // Si aún hay guerreros vivos, el noCaminante será un guerrero
                if (guerreros.length > 0) {
                    noCaminante = guerreros[0];
                }

                // Si no quedan guerreros vivos, los dragones dejarán de ser apoyo y serán atacantes
                else {
                    noCaminante = dragon;
                }

                console.log(`Nuevo enfrentamiento: ${noCaminante.getNombre} vs ${caminantes[0].getNombre}`);

                // Mientras uno de los 2 sigan vivos, seguirán enfrentándose
                while (!muerto && caminantes.length > 0) {
                    // Si el atacante es un guerrero, siempre ataca
                    if (noCaminante instanceof Guerrero) {
                        noCaminante.atacar(caminantes[0]);
                    }
                    
                    // Si el atacante que queda es un dragón, hay probabilidad de que ataque o falle
                    else if (noCaminante instanceof Dragon) {
                        let random = Math.floor(Math.random() * 2);
                        if (random == 1) {
                            dragon.atacar(caminantes[0]);
                        }
                        else {
                            console.log(`${noCaminante.getNombre} ha fallado el ataque.`);
                        }
                    }
                    
                    // Si el caminante sobrevive al ataque y sigue luchando un guerrero, hay probabilidad de que un dragón lo remate
                    if (caminantes[0].getVivo && (noCaminante instanceof Guerrero)) {
                        let random = Math.floor(Math.random() * 10);
                        if (random == 1) {
                            dragon.atacar(caminantes[0]);
                        }
                    }

                    // Si muere un caminante, se elimina y pasa el siguiente
                    if (!caminantes[0].getVivo) {

                        // Si el atacante es un dragón, no tiene dragón de apoyo que mostrar
                        if (noCaminante instanceof Dragon) {
                            console.log(`${noCaminante.getNombre}: ${noCaminante.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);
                        }
                        else {
                            console.log(`${noCaminante.getNombre}: ${noCaminante.getVida} | ${dragon.getNombre}: ${dragon.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);
                        }

                        this.#muertos.push(`${caminantes[0].getNombre} (Caminante)`);
                        caminantes.shift(); // Pasa al siguiente caminante
                        muerto = true;
                    }

                    // Si el caminante sigue vivo, ataca al guerrero y al dragon (si aún hay guerreros, si no, al dragón directamente)
                    else { 
                        caminantes[0].atacar(noCaminante);

                        // Si hay algún dragón vivo, ataca a este también
                        if (noCaminante instanceof Guerrero && (khaleesi.getDragones.length > 0 && dragon.getVivo)) caminantes[0].atacar(dragon);
                    }

                    // Si muere el principal atacante (guerrero o dragón), se vuelve un Caminante Blanco
                    if (!noCaminante.getVivo) {
                        console.log(`${noCaminante.getNombre} es ahora un Caminante Blanco.`);

                        // Si el atacante es un dragón, no tiene dragón de apoyo que mostrar
                        if (noCaminante instanceof Dragon) {
                            console.log(`${noCaminante.getNombre}: ${noCaminante.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);
                        }
                        else {
                            console.log(`${noCaminante.getNombre}: ${noCaminante.getVida} | ${dragon.getNombre}: ${dragon.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);
                        }

                        let caminante;

                        // En caso de ser guerrero
                        if (noCaminante instanceof Guerrero) {
                            caminante = new CaminanteBlanco(noCaminante.getNombre, noCaminante.getArma.getDanio);
                            guerreros.shift();
                        }

                        // En caso de ser dragón
                        else if (noCaminante instanceof Dragon) {
                            caminante = new CaminanteBlanco(noCaminante.getNombre, noCaminante.getPoder);
                            caminante.setVida = 200;
                            khaleesi.getDragones.shift();
                        }

                        // Añade el nuevo caminante al ejército de Caminantes Blancos a atacar el último
                        if (caminante) {
                            caminantes.push(caminante);
                        }

                        this.#muertos.push(`${noCaminante.getNombre} (Muerto)`);
                        muerto = true;
                    }

                    // Si muere un dragón de apoyo, se vuelve un Caminante Blanco
                    if (dragon !== noCaminante && !dragon.getVivo) {
                        console.log(`${dragon.getNombre} es ahora un Caminante Blanco.`);
                        console.log(`${noCaminante.getNombre}: ${noCaminante.getVida} | ${dragon.getNombre}: ${dragon.getVida} | ${caminantes[0].nombre}: ${caminantes[0].getVida}`);

                        let caminante = new CaminanteBlanco( dragon.getNombre, dragon.getPoder);
                        caminante.setVida = 200; // Se le asigna la vida de los dragones

                        // Añade al dragón de apoyo al ejército de Caminantes Blancos a atacar el primero
                        caminantes.unshift(caminante);
                        this.#muertos.push(`${dragon.getNombre} (Muerto)`);

                        khaleesi.getDragones.shift();
                        muerto = true;
                    }
                    // Si sigue vivo, vuelve a atacar
                }
                console.log("--------------------");
            }

            let superviviente;

            // Si gana la casa con guerreros vivos
            if (guerreros.length > 0) {
                console.log(`La batalla ha sido ganada por la Casa ${casa.getNombre} y Khaleesi.`);
                guerreros.forEach(g => {
                    superviviente = `${g.getNombre} (Guerrero)`;
                    this.#supervivientes.push(superviviente);
                })

                khaleesi.getDragones.forEach(d => {
                    superviviente = `${d.getNombre} (Dragón)`;
                    this.#supervivientes.push(superviviente);
                })
            }

            // Si ganan los dragones de khaleesi pero con los guerreros muertos
            else if (guerreros.length <= 0 && khaleesi.getDragones.length > 0) {
                console.log(`La batalla ha sido ganada por Khaleesi y sus dragones: ${khaleesi.getDragones.map(d => d.getNombre)}`);
                khaleesi.getDragones.forEach(d => {
                    superviviente = `${d.getNombre} (Dragón)`;
                    this.#supervivientes.push(superviviente);
                })
            }

            // Si ganan los caminantes blancos
            else if (caminantes.length > 0) {
                console.log(`La batalla ha sido ganada por los Caminantes Blancos.`);
                caminantes.forEach(c => {
                    superviviente = `${c.getNombre} (Caminante Blanco)`;
                    this.#supervivientes.push(superviviente);
                })
            }

            this.mostrarGuerrerosMuertosEnCombate();
            this.mostrarSupervivientes();
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