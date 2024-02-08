const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");
/* const bcrypt = require('bcrypt'); */

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(login)

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

const corsOptions = {
    origin: 'http://www.midominio.es',
    methods: 'GET,PUT,POST,DELETE'
};

app.use(cors(corsOptions))
let usuarios = [];


app.get('/usuarios', async (req, res) => {
    let results = await app.locals.db.collection('usuarios').find().toArray()
    res.json(results);
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(user => user.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
});


app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    let usuario = usuarios.find(user => user.id === id);
    if (usuario) {
        usuario = { ...usuario, ...datosActualizados };
        res.json({ mensaje: 'Usuario actualizado correctamente', usuario: usuario });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const indice = usuarios.findIndex(user => user.id === id);
    if (indice !== -1) {
        usuarios.splice(indice, 1);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.post('/registro', async (req, res) => {
    try {
        let contraseinaCifrada = bcrypt.hashSync(req.body.password, 10)
        let result = await app.locals.db.collection('usuarios')
            .insertOne({
                username: req.body.username,
                password: contraseinaCifrada
            })
        res.send({ mensaje: "Usuario registrado correctamente", result })
    } catch (error) {
        res.send({ mensaje: "Error al registrar al usuario", error })
    }
})


app.post('/login', async (req, res) => {
    try {
        let result = await app.locals.db.collection('usuarios').findOne({ username: req.body.username });
        if (result) {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                res.send({ mensaje: 'Logueado correctamente' });
            } else {
                res.send({ mensaje: 'Contraseña incorrecta' });
            }
        } else {
            res.send({ mensaje: 'El usuario no existe' });
        }
    } catch (error) {
        res.send({ mensaje: "Error al iniciar sesión", error });
    }
});



function login(req, res, next) {
    console.log(`IP: ${req.ip}, Ruta: ${req.originalUrl}`);
    next();
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
