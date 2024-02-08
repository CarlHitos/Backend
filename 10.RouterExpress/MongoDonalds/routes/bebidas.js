const express = require('express');
const router = express.Router();

let productos = {
    bebidas: [
        { nombre: "MongoCola", precio: 2 },
        { nombre: "Fantongo", precio: 2 },
        { nombre: "Agua", precio: 1 },
        { nombre: "Mongo Brew", precio: 2.5 }
    ]
};

router.get('/', (req, res) => {
    res.json(productos.bebidas);
});

module.exports = router;
