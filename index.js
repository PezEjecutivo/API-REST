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
//importamos helmet
const helmet = require("helmet");
//Importamos Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Inicializamos la aplicación
const app = express();

//Usamos helmet
app.use(helmet());

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

//Configuracion de swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const url = "mongodb://localhost:27017/concesionariosdb";

const client = new MongoClient(url);

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
    console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)

//Conectamos la base de datos
client.connect();

// Lista todos los concesionarios
app.get("/concesionarios", async (request, response) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.find().toArray();

        response.json(concesionarios);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Añadir un nuevo concesionarios
app.post("/concesionarios", async (request, response) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.insertOne(request.body);

        response.json({ message: "ok" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Obtener un solo concesionarios
app.get("/concesionarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.find({ id: id }).toArray();

        response.json(concesionarios);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Actualizar un solo concesionarios
app.put("/concesionarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.updateOne({ id: id }, { $set: request.body });

        response.json({ message: "ok" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Borrar un elemento del array
app.delete("/concesionarios/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.deleteOne({ id: id });

        response.json({ message: "ok" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

//Hacemos el apartado de coches dentro de los concesionarios
// Lista todos los coches de un concesionario
app.get("/concesionarios/:id/coches", async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.find({ id: id }, { projection: { _id: 0, coches: 1 } }).toArray();

        //response.json({ message: "ok" });
        response.json(concesionarios);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Añadir un nuevo coche al concesionario
app.post("/concesionarios/:id/coches", async (request, response) => {
    const id = parseInt(request.params.id);
    response.json({ message: "ok" });
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.updateOne({ id: id }, { $push: { coches: request.body } });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Obtener un solo coche del concesionario
app.get("/concesionarios/:id/coches/:cocheid", async (request, response) => {
    const id = parseInt(request.params.id);
    const cocheid = parseInt(request.params.cocheid);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const resultado = await collection.findOne(
            { id: id },
            { projection: { _id: 0, coches: { $elemMatch: { id: cocheid } } } }
        );

        response.json(resultado);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Actualizar un solo coche del concesionario
app.put("/concesionarios/:id/coches/:cocheid", async (request, response) => {
    const id = parseInt(request.params.id);
    const cocheid = parseInt(request.params.cocheid);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.updateOne(
            { id: id, "coches.id": cocheid },
            {
                $set: {
                    "coches.$.modelo": request.body.modelo,
                    "coches.$.cv": request.body.cv,
                    "coches.$.precio": request.body.precio,
                },
            }
        );
        response.json({ message: "ok" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }
});

// Borrar un elemento del array
app.delete("/concesionarios/:id/coches/:cocheid", async (request, response) => {
    const id = parseInt(request.params.id);
    const cocheid = parseInt(request.params.cocheid);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("concesionariosdb");
        const collection = db.collection("concesionarios");

        const concesionarios = await collection.updateOne({ id: id }, { $pull: { coches: { id: cocheid } } });
        response.json({ message: "ok" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error en la búsqueda de concesionarios");
    } finally {
        if (client) {
            await client.close();
        }
    }

    response.json({ message: "ok" });
});
