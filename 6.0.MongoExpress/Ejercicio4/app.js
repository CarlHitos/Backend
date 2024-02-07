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

app.get('/api/menus', async(req, res)=>{
    try {
        const results = await app.locals.db.collection('menus').find({}).toArray()
        res.send({mensaje: "Petición satisfecha", results})    
    } catch (error) {
        res.send({mensaje: "Petición No resuelta", error})
    }
})

app.post('/api/nuevoMenu', async (req, res) => {
    try {
        let { numeroMenu, primerPlato, segundoPlato, postre, precio } = req.body;
        precio = parseInt(precio)

        let results = await app.locals.db.collection('menus').insertOne({ numeroMenu, primerPlato, segundoPlato, postre, precio });
        res.status(201).json({ mensaje: 'Menú añadido correctamente', menu: results });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al añadir el menú', error: error.message });
    }
});

app.put('/api/editarMenu', async (req, res) => {
    try {
        let { numeroMenu, primerPlato, segundoPlato, postre, precio } = req.body;
        const filter = { numeroMenu };
        const updateDocument = {
            $set: {
                primerPlato: primerPlato,
                segundoPlato: segundoPlato,
                postre: postre,
                precio: parseInt(precio)
            }
        };

        const results = await app.locals.db.collection('menus').updateOne(filter, updateDocument);
        if (results.modifiedCount === 1) {
            res.status(200).json({ mensaje: `Menú con número ${numeroMenu} modificado correctamente` });
        } else {
            res.status(404).json({ mensaje: `Menú con número ${numeroMenu} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al modificar el menú', error: error.message });
    }
});


app.delete('/api/borrarMenu', async (req, res) => {
    try {
        const { numeroMenu } = req.body;
        const result = await app.locals.db.collection('menus').deleteOne({ numeroMenu: numeroMenu });

        if (result.deletedCount === 1) {
            res.status(200).json({ mensaje: `Menú con número ${numeroMenu} eliminado correctamente` });
        } else {
            res.status(404).json({ mensaje: `Menú con número ${numeroMenu} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al borrar el menú', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
