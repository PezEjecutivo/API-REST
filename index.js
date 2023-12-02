/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");
//Importamos mongodb con el siguiente comando
const MongoClient = require("mongodb").MongoClient;

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8081;

// Arrancamos la aplicación
app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)

//Creamos el JSON de concesionario y sus arrays de coches
let concesionario = [
    {
        nombre: "Nombre X",
        direccion: "Calle X",
        //Creamos un array de coches, dentro del concesionario
        coches: [
            { modelo: "Modelo 1X", cv: "1X cv", precio: "1X Dinero" },
            { modelo: "Modelo 2X", cv: "2X cv", precio: "2X Dinero" },
            { modelo: "Modelo 3X", cv: "3X cv", precio: "3X Dinero" },
        ],
    },
    {
        nombre: "Nombre Y",
        direccion: "Calle Y",
        coches: [
            { modelo: "Modelo 1Y", cv: "1Y cv", precio: "1Y Dinero" },
            { modelo: "Modelo 2Y", cv: "2Y cv", precio: "2Y Dinero" },
            { modelo: "Modelo 3Y", cv: "3Y cv", precio: "3Y Dinero" },
        ],
    },
    {
        nombre: "Nombre H",
        direccion: "Calle H",
        coches: [
            { modelo: "Modelo 1H", cv: "1H cv", precio: "1H Dinero" },
            { modelo: "Modelo 2H", cv: "2H cv", precio: "2H Dinero" },
            { modelo: "Modelo 3H", cv: "3H cv", precio: "3H Dinero" },
        ],
    },
];

// Lista todos los concesionarios
app.get("/concesionarios", (request, response) => {
    response.json(concesionario);
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", (request, response) => {
    concesionario.push(request.body);
    response.json({ message: "ok" });
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", (request, response) => {
    const id = request.params.id;
    const result = concesionario[id];
    response.json({ result });
});

// Actualizar un solo concesionarios
app.put("/concesionarios/:id", (request, response) => {
    const id = request.params.id;
    concesionario[id] = request.body;
    response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", (request, response) => {
    const id = parseInt(request.params.id);
    concesionario = concesionario.filter((item, index) => index !== id);

    response.json({ message: "ok" });
});

//Hacemos el apartado de coches dentro de los concesionarios
// Lista todos los coches de un concesionario
app.get("/concesionarios/:id/coches", (request, response) => {
    const id = request.params.id;
    response.json(concesionario[id].coches);
});

// Añadir un nuevo coche al concesionario
app.post("/concesionarios/:id/coches", (request, response) => {
    const id = request.params.id;
    concesionario[id].coches.push(request.body);
    response.json({ message: "ok" });
});

// Obtener un solo coche del concesionario
app.get("/concesionarios/:id/coches/:cocheid", (request, response) => {
    const id = request.params.id;
    const cocheid = request.params.cocheid;
    const result = concesionario[id].coches[cocheid];
    response.json({ result });
});

// Actualizar un solo coche del concesionario
app.put("/concesionarios/:id/coches/:cocheid", (request, response) => {
    const id = request.params.id;
    const cocheid = request.params.cocheid;
    concesionario[id].coches[cocheid] = request.body;
    response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/concesionarios/:id/coches/:cocheid", (request, response) => {
    const id = parseInt(request.params.id);
    const cocheid = parseInt(request.params.cocheid);
    concesionario[id].coches = concesionario[id].coches.filter((item, index) => index !== cocheid);

    response.json({ message: "ok" });
});

const url = "mongodb://localhost:27017/concesionariosdb";

const client = new MongoClient(url);

client
    .connect()
    .then(() => {
        console.log("Conexion con la base de datos abierta");
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");
        collection
            .find({ nombre: "Nombre X" })
            .toArray()
            .then((documents) => {
                console.log("Consulta completada. Datos de las consultas:", documents);
            })
            .catch((err) => {
                console.error("Error al realizar la consulta:", err);
            });
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });
