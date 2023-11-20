/**
 * Tres formas de almacenar valores en memoria en Javascript
 *     - let: se puede modificar
 *     - var: se puede modificar
 *     - const: es constante y no se puede modificar
 */

//Importamos las bibliotecas necesarias.
//Concretamente el framework express.
const express = require('express');

// Inicializamos la aplicacion con express
const app = express();

app.use(express.json());

//Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

//Arrancamos la aplicacion
app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
})

//Crea un array de coches
let coches = [
    { "marca": "Renault", "modelo": "Clio" },
    { "marca": "Nissan", "modelo": "Skyline R34" }
];


//Lista todos los coches
app.get("/coches", (request, response) => {
    response.json(coches);
});

//Añadir un nuevo coche
app.post("/coches", (request, response) => {
    coches.push(request.body);
    response.json({ "message": "ok" });
});

//Obtener un solo coche
app.get("/coches/:id", (request, response) => {
    const id = request.params.id;
    const result = coches[id];
    response.json({ result });
});

//Actualizar un solo coche
app.put("/coches/:id", (request, response) => {
    const id = request.params.id;
    coches[id] = request.body;
    response.json({ message: "ok" });
})

//Borramos un solo coche
app.delete("/coches/:id", (request, response) => {
    const id = request.params.id;
    coches = coches.filter((item) => coches.indexOf(item) == id);

    response.json({ message: "ok" })
})