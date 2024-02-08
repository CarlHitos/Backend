const express = require('express');
const router = express.Router();

let productos = {
    hamburguesas: [
        { nombre: "Grand Big Mongo", precio: 6 },
        { nombre: "Big Mongo", precio: 5.5 },
        { nombre: "MongoPollo", precio: 5 },
        { nombre: "Cuarto de Mongo", precio: 4.5 },
        { nombre: "MongoRoyal Deluxe", precio: 4.5 }
    ]
};

router.get('/', (req, res) => {
    res.json(productos.hamburguesas);
});

module.exports = router;
