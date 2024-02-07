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


app.get('/api/series', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({}).toArray();
        res.status(200).send({mensaje: "Petición correcta", results})
    } catch (error) {
        res.status(500).send({mensaje: "Petición no satisfecha", error})
    }
});

app.get('/api/series/:titulo', async (req, res) => {
    try {
        const results = await app.locals.db.collection('series').find({titulo: req.params.titulo}).toArray();
        results.length > 0
        ? res.send({ mensaje: "Petición satisfecha", results })
        : res.send({ mensaje: "Serie no presente en la BBDD" })
    } catch (error) {
        res.status(500).send({mensaje: "No se ha podido buscar la serie", error})
    }
});


app.post('/api/nuevaSerie', async(req, res)=>{
    try {
        let {titulo, plataforma, nota} = req.body
        nota = parseInt(nota)
        const results = await app.locals.db.collection('series').insertOne({titulo, plataforma, nota})
        res.send({mensaje: "Serie añadida", results})
    } catch (error) {
        res.send({mensaje: 'Serie no añadida', error})
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
