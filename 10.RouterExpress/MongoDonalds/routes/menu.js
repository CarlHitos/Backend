const express = require('express');
const router = express.Router();

let productos = {
    menus: [
        { nombre: "Grand Big Mongo", precio: 8.5 },
        { nombre: "Big Mongo", precio: 8 },
        { nombre: "MongoPollo", precio: 7.5 },
        { nombre: "Cuarto de Mongo", precio: 7 },
        { nombre: "MongoRoyal Deluxe", precio: 7 }
    ]
};

router.get('/', (req, res) => {
    res.json(productos.menus);
});

module.exports = router;
