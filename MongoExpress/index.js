const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function conectarDB() {
    try {
        await client.connect({ dbName: 'pruebas' });
        console.log('Conexión exitosa a MongoDB');

        app.locals.db = client.db('pruebas');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
}

conectarDB();

app.get('/planetas', async (req, res) => {
    try {
        const db = app.locals.db;
        const planetas = await db.collection('naves').find().toArray();
        res.send(planetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const db = app.locals.db;
        const nuevoUsuario = req.body;

        // Verifica si _id está presente y no es undefined
        if (nuevoUsuario && nuevoUsuario._id !== undefined) {
            // Si _id está presente y no es undefined, elimina _id para que MongoDB lo genere automáticamente
            delete nuevoUsuario._id;
        }

        const resultado = await db.collection('naves').insertOne(nuevoUsuario);

        if (resultado.insertedCount === 1 && resultado.ops.length > 0) {
            // Verifica que la inserción haya tenido éxito
            res.json(resultado.ops[0]);
        } else {
            res.status(500).json({ mensaje: 'Error al agregar usuario' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar usuario' });
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});














// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();

// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri);

// async function conectarDB() {
//     try {
//         await client.connect({ dbName: 'pokemon' });
//         console.log('Conexión exitosa a MongoDB');
//     } catch (error) {
//         console.error('Error de conexión a MongoDB:', error);
//     }
// }

// conectarDB();

// app.get('/usuarios', async (req, res) => {
//     try {
//         const db = client.db('pokemon');
//         const usuarios = await db.collection('samples_pokemon').find().toArray();
//         res.send(usuarios);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ mensaje: 'Error al obtener usuarios' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor en ejecución en http://localhost:${PORT}`);
// });








