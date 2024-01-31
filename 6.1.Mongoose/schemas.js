let mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    genero: String,
    fechaNacimiento: Date,
    nacionalidad: { type: String, required: true },
    nombreArtistico: String,
});

const discoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: { type: String, required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    anno: { type: Number, required: true },
    genero: String,
    stock: { type: Number, required: true },
    formato: String,
});

let Artista = mongoose.model('Artista', artistSchema);
let Disco = mongoose.model('Disco', discoSchema);

module.exports = {Artista, Disco}