import { Guerrero } from "./clases/personajesEspeciales/Guerrero.js";
import { Casa } from "./clases/Casa.js";
import { Arma } from "./clases/Arma.js";
import { Consejero } from "./clases/personajesEspeciales/Consejero.js";
import { Rey } from "./clases/personajesEspeciales/Rey.js";

// Casas
let casaStark = new Casa("Stark");
let casaLannister = new Casa("Lannister");

// Armas
let garra = new Arma("Garra", "espada", 25);

// Personajes
let jon = new Guerrero("Jon Snow", 18, casaStark, garra);
let tyrion = new Consejero("Tyrion Lannister", 18, casaLannister, "sanación");
let robert = new Rey("Robert Baratheon", 18, casaLannister, 15);

jon.presentacion();
jon.luchar();
jon.entrenar();

tyrion.presentacion();
tyrion.luchar();
tyrion.aconsejar(robert);

robert.presentacion();
robert.gobernar();
robert.luchar();