const express = require('express');
const router = express.Router();

// Check-in
router.post('/reserva', async (req, res) => {
    const { DNI, numeroHabitacion } = req.body;
    try {
        let cliente = await req.app.locals.db.collection('clientes').findOne({ DNI });
        if (!cliente) {
            return res.send({ mensaje: 'El cliente no está registrado' });
        }
        let habitacion = await req.app.locals.db.collection('habitaciones').findOne({ numeroHabitacion: numeroHabitacion, estado: 'libre' });
        if (!habitacion) {
            return res.send({ mensaje: 'La habitación no está disponible' });
        }
        await req.app.locals.db.collection('reservas').insertOne({ cliente: DNI, habitacion: numeroHabitacion, fechaCheckIn: new Date(), fechaCheckOut: null });

        await req.app.locals.db.collection('habitaciones').updateOne({ numeroHabitacion: numeroHabitacion }, { $set: { estado: 'ocupado' } });

        res.send({ mensaje: 'Check-in completado con éxito' });
    } catch (error) {
        res.send({ mensaje: 'Error al hacer el check-in', error });
    }
});

//Añadir habitaciones
router.post('/habitaciones', async (req, res) => {
    const { numeroHabitacion, estado } = req.body;
    try {
        const existingRoom = await req.app.locals.db.collection('habitaciones').findOne({ numeroHabitacion });
        if (existingRoom) {
            return res.status(400).send({ mensaje: 'La habitación ya existe' });
        }
        const newRoom = await req.app.locals.db.collection('habitaciones').insertOne({ numeroHabitacion, estado });

        res.status(201).send({ mensaje: 'Habitación añadida correctamente', newRoom});
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al añadir la habitación', error });
    }
});

module.exports = router;
