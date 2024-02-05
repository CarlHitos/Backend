const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

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

app.get('/api/mesas', async (req, res) => {
    try {
        const db = app.locals.db;
        const mesas = await db.collection('mesas').find().toArray();
        res.status(200).send({mensaje: "Petición correcta", results})
    } catch (error) {
        res.status(500).send({mensaje: "Petición no satisfecha", error})
    }
});

app.post('/api/anyadir', async (req, res) => {
    try {
        let { tamano, color, material, patas  } = req.body
        const results = await app.locals.db.collection('mesas').insertOne({ tamano, color, material, patas })
        res.send({ mensaje: "Documento insertado: " + results.insertedId, results })
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al hacer la inserción', error });
    }
})

app.put('/api/modificar/:color', async (req, res) => {
    try {
        const results = await app.locals.db.collection('mesas').updateMany({color: req.params.color}, {$set: {color: "Roja"}})
        res.send({mensaje: "Documento(s) actualizado(s)", results})
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al modificar el documento', error });
    }
})

app.delete('/api/borrar/:patas', async (req, res) => {
    try {
        const results = await app.locals.db.collection('mesas').deleteMany({patas: parseInt(req.params.patas)})
        res.send({mensaje: "Documento(s) borrado(s)", results})
    } catch (error) {
        res.send({mensaje: "Borrado fallido", error})
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});







