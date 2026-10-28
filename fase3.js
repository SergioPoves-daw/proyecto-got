import { Casa } from './clases/Casa.js';
import { Arma } from './clases/Arma.js';
import { Guerrero } from './clases/personajesEspeciales/Guerrero.js';
import { Rey } from './clases/personajesEspeciales/Rey.js';
import { Consejero } from './clases/personajesEspeciales/Consejero.js'
import { Batalla } from './clases/Batalla.js';

const casaStark = new Casa("Stark", "El invierno se acerca");
const casaLannister = new Casa("Lannister", "Oye mi rugido");

const garra = new Arma("Garra", 90);
const aguja = new Arma("Aguja", 70);
const hacha = new Arma("Hacha del Norte", 80);
const espadaLarga = new Arma("Espada Larga", 85);
const ballesta = new Arma("Ballesta", 75);
const filoRojo = new Arma("Filo Rojo", 88);
const lanzaDeCaza = new Arma("Lanza de Caza", 60);

// === GUERREROS DE LA CASA STARK ===
const jon = new Guerrero("Jon Snow", 25, casaStark, garra);
const arya = new Guerrero("Arya Stark", 18, casaStark, aguja);
const robb = new Guerrero("Robb Stark", 22, casaStark, espadaLarga);
const brienne = new Guerrero("Brienne de Tarth", 30, casaStark, hacha);

// === GUERREROS DE LA CASA LANNISTER ===
const jaime = new Guerrero("Jaime Lannister", 32, casaLannister, filoRojo);
const cersei = new Guerrero("Cersei Lannister", 34, casaLannister, lanzaDeCaza);
const tyrion = new Guerrero("Tyrion Lannister", 30, casaLannister, ballesta);
const gregor = new Guerrero("Gregor Clegane", 38, casaLannister, hacha);

casaStark.listaMiembros();
casaLannister.listaMiembros();

const batallaBastardos = new Batalla();
batallaBastardos.iniciarBatalla(casaStark, casaLannister);