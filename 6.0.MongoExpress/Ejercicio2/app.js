const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('public'))

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function conectarDB() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('ejercicios'));
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


app.post('/api/nuevoLibro/:titulo', async(req, res)=>{
    try {
        const results = await app.locals.db.collection('libros').insertOne({titulo: req.params.titulo, leido: false})
        res.send({mensaje: "Libro insertado", results})
    } catch (error) {
        res.send({mensaje: 'Libro no insertado', error})
    }
})

app.put('/api/editarLibro/:libro', async (req, res) => {
    try {
        const results = await app.locals.db.collection('libros').updateOne({ titulo: req.params.titulo}, {$set: {leido: true}})
        res.send({mensaje: "Libro modificado", results})
    } catch (error) {
        res.status(500).send({ mensaje: 'Libro no modificado', error });
    }
})


app.delete('/api/borrarLibro/:titulo', async (req,res)=>{
    try {
        const results = await app.locals.db.collection('libros').deleteOne({ titulo: req.params.titulo })
        results.deletedCount < 1
        ? res.send({ mensaje: "Libro no borrado", results})
        : res.send({ mensaje: "Libro borrado", results })
    } catch (error) {
        res.send({ mensaje: 'Libro no borrado', error })
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
