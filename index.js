/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

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
  const id = request.params.id;
  concesionario = concesionario.filter(
    (item) => concesionario.indexOf(item) !== id
  );

  response.json({ message: "ok" });
});
