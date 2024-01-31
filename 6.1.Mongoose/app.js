let express = require('express')
let mongoose = require('mongoose')
let app = express()
let { Artista, Disco } = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/ejercicios')
    .then(console.log('🟢 MongoDB está conectado'))
    .catch(err => {
        console.log('🔴 MongoDB no conectado: ' + err)
    })

    let canserberoArtista = new Artista({
        _id: new mongoose.Types.ObjectId(),
        nombre: "Tyron Jose Gonzalez Orama",
        genero: "Rap Underground",
        fechaNacimiento: "11/03/1988",
        nacionalidad: " Venezolano",
        nombreArtistico: "Canserbero",
    });
    
    let muerteDisco = new Disco({
        _id: new mongoose.Types.ObjectId(),
        titulo: "Muerte",
        artista: canserberoArtista._id,
        anno: 2012,
        genero: "Rap",
        stock: 1000,
        formato: "Digital",
    });

    
// canserberoArtista.save().then(console.log("Canserbero añadido")).catch(e=> console.error("No se ha podido añadir a Canserbero" + e)) 
// muerteDisco.save().then(console.log("Muerte añadido")).catch(e=> console.error("No se ha podido añadir a Muerte" + e)) 

app.get('/discos', async (req, res) => {
    try {
        let results = await Disco.find({ stock: { $gt: 0 } });
        res.send({mensaje: "Se ha completado la petición", results});
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error });
    }
});

app.get('/discos/:parametro', async (req, res) => {
    try {
        const parametro = req.params.parametro;

        let results;
        if (mongoose.Types.ObjectId.isValid(parametro)) {
            results = await Disco.findById(parametro);
        }

        if (!results) {
            results = await Disco.findOne({ titulo: parametro });
        }

        if (!results) {
            res.status(404).send({ mensaje: 'Disco no encontrado' });
        } else {
            res.send({ mensaje: 'Se ha completado la petición', results });
        }
    } catch (error) {
        res.status(500).send({ mensaje: 'No se ha podido completar la petición', error });
    }
});

app.post('/add', async (req, res) => {
    try {
        // Verificar que los campos obligatorios están presentes
        const { titulo, anno, stock, formato } = req.body;
        if (!titulo || !anno || !stock || !formato) {
            return res.status(400).send({ mensaje: 'Los campos marcados con asterisco son obligatorios.' });
        }

        // Crear el nuevo disco
        const nuevoDisco = new Disco({
            _id: new mongoose.Types.ObjectId(),
            titulo,
            artista: canserberoArtista._id,
            anno,
            genero: req.body.genero || null,
            stock,
            formato,
        });

        // Guardar el disco en la base de datos
        await nuevoDisco.save();

        res.status(201).send({ mensaje: 'Disco añadido correctamente', nuevoDisco });
    } catch (error) {
        res.status(500).send({ mensaje: 'No se ha podido completar la petición', error });
    }
});





app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});