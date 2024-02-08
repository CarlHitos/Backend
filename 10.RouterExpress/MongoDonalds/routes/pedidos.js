const express = require('express');
const router = express.Router();

let pedidoActual = [];

router.post('/', (req, res) => {
    const { producto } = req.body;
    pedidoActual.push(producto);
    res.sendStatus(200);
});

router.get('/finalizar', (req, res) => {
    let precioTotal = calcularPrecioTotal(pedidoActual);
    res.json({ pedido: pedidoActual, precioTotal });
});

router.put('/finalizar', (req, res) => {
    const { nuevoPedido } = req.body;
    pedidoActual = nuevoPedido;
    let precioTotal = calcularPrecioTotal(pedidoActual);
    res.json({ pedido: pedidoActual, precioTotal });
});

function calcularPrecioTotal(pedido) {
    let total = 0;
    pedido.forEach(item => {
        total += obtenerPrecioProducto(item);
    });
    return total;
}

function obtenerPrecioProducto(nombreProducto) {
    let productos = {
        menus: [
            { nombre: "Grand Big Mongo", precio: 8.5 },
            { nombre: "Big Mongo", precio: 8 },
            { nombre: "MongoPollo", precio: 7.5 },
            { nombre: "Cuarto de Mongo", precio: 7 },
            { nombre: "MongoRoyal Deluxe", precio: 7 }
        ],
        hamburguesas: [
            { nombre: "Grand Big Mongo", precio: 6 },
            { nombre: "Big Mongo", precio: 5.5 },
            { nombre: "MongoPollo", precio: 5 },
            { nombre: "Cuarto de Mongo", precio: 4.5 },
            { nombre: "MongoRoyal Deluxe", precio: 4.5 }
        ],
        bebidas: [
            { nombre: "MongoCola", precio: 2 },
            { nombre: "Fantongo", precio: 2 },
            { nombre: "Agua", precio: 1 },
            { nombre: "Mongo Brew", precio: 2.5 }
        ],
        patatas: [
            { nombre: "MongoFries", precio: 1 }
        ]
    };

    for (let category in productos) {
        const producto = productos[category].find(item => item.nombre === nombreProducto);
        if (producto) {
            return producto.precio;
        }
    }
    return 0; 
}

module.exports = router;
