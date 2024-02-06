const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function conectarDB() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('prueba'));
        await client.db("admin").command({ ping: 1 });
        console.log("🟢 MongoDB está conectado");
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error);
    }
}

conectarDB();

app.get('/api/libros', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').find().toArray();
        res.status(200).send({mensaje: "Petición correcta", results})
    } catch (error) {
        res.status(500).send({mensaje: "Petición no satisfecha", error})
    }
});

app.get('/api/libros/:titulo', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').find({titulo: req.params.titulo}).toArray();
        res.status(200).send({mensaje: "Petición correcta", results})
    } catch (error) {
        res.status(500).send({mensaje: "Petición no satisfecha", error})
    }
});


app.post('/api/nuevoLibro/:libro', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').insertOne({ titulo: req.params.titulo , leido: false})
        res.send({ mensaje: "Documento insertado: " + results.insertedId, results })
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al hacer la inserción', error });
    }
})

app.put('/api/modificar/:color', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').updateOne({ titulo: req.params.titulo , leido: false})
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
