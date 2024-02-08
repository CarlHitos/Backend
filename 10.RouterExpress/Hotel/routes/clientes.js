const express = require('express');
const router = express.Router();

// Registrar cliente
router.post('/registrar', async (req, res) => {
    let { nombre, apellido, DNI } = req.body;
    try {
        const results = await req.app.locals.db.collection('clientes').findOne({ DNI });
        if (results) {
            return res.send({ mensaje: 'El cliente ya está registrado', results });
        }
        let nuevoCLiente = await req.app.locals.db.collection('clientes').insertOne({ nombre, apellido, DNI });
        res.send({ mensaje: "Cliente registrado correctamente", nuevoCLiente });
    } catch (error) {
        res.send({ mensaje: 'Error al registrar el cliente', error });
    }
});

// Editar cliente
router.put('/editar/:dni', async (req, res) => {
    const { nombre, apellido } = req.body;
    const { dni } = req.params;
    try {
        const cliente = await req.app.locals.db.collection('clientes').findOne({ DNI: dni });
        if (!cliente) {
            return res.status(404).send({ mensaje: 'Cliente no encontrado' });
        }

        await req.app.locals.db.collection('clientes').updateOne(
            { DNI: dni },
            { $set: { nombre, apellido } }
        );

        const clienteActualizado = await req.app.locals.db.collection('clientes').findOne({ DNI: dni });

        res.send({ mensaje: "El cliente ha sido modificado correctamente", results: clienteActualizado });
    } catch (error) {
        res.send({ mensaje: 'Error al editar el cliente', error });
    }
});


module.exports = router;
