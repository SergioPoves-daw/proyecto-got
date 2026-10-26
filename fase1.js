import { Personaje } from "./clases/Personaje.js"; 
import { Casa } from "./clases/Casa.js"; 
import { Reino } from "./clases/Reino.js"; 
import { Arma } from "./clases/Arma.js"; 

// Casas
let casaStark = new Casa("Stark", "Se acerca el invierno");
let casaLannister = new Casa("Lannister", "¡Oye mi Rugido!");

// Reinos
let reinoPoniente = new Reino("Poniente");

// Armas
let garra = new Arma("Garra", "espada", 25);
let aguja = new Arma("Aguja", "espada", 15);

// Personajes
let jon = new Personaje("Jon Snow", 18);
let arya = new Personaje("Arya Stark", 18);
let jaime = new Personaje("Jaime Lannister", 18);

// Añadir casa al reino
reinoPoniente.setCasa = casaStark;
reinoPoniente.setCasa = casaLannister;

// Asignar arma a los personajes
jon.setArma = garra;
arya.setArma = aguja;

// Añadir miembros a las casas
casaStark.setMiembro = jon;
casaStark.setMiembro = arya;
casaLannister.setMiembro = jaime;

// Convertir en rey a un personaje de un reino
reinoPoniente.setRey = jaime;

// Información del reino
reinoPoniente.listarCasas();
reinoPoniente.informacionRey();

// Miembros de la casa
casaStark.listaMiembros();

// Presentaciones de personajes
console.log("Presentaciones:");
jon.presentacion();
arya.presentacion();
jaime.presentacion();

// Descripciones de las armas
console.log("Armas:");
garra.descripcion();
aguja.descripcion();