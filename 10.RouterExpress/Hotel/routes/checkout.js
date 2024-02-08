const express = require('express');
const router = express.Router();

// Checkout
router.put('/salida', async (req, res) => {
    const { DNI } = req.body;
    try {
        const cliente = await req.app.locals.db.collection('clientes').findOne({ DNI });
        if (!cliente) {
            return res.send({ mensaje: 'El cliente no está registrado'});
        }
        const reserva = await req.app.locals.db.collection('reservas').findOneAndUpdate({ cliente: DNI, fechaCheckOut: null }, { $set: { fechaCheckOut: new Date() } });
        if (!reserva) {
            return res.send({ mensaje: 'No se encontró reserva activa para este cliente'});
        }
/*         console.log(reserva) */
        await req.app.locals.db.collection('habitaciones').updateOne({ numeroHabitacion: reserva.habitacion }, { $set: { estado: 'libre' } });
/*         console.log(reserva.habitacion) */
        res.json({ mensaje: 'Checkout completado con éxito' });
    } catch (error) {
        res.send({ mensaje: 'Error al hacer el checkout', error });
    }});

module.exports = router;
