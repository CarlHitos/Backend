const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const clientesRouter = require('./routes/clientes');
const checkinRouter = require('./routes/checkin');
const checkoutRouter = require('./routes/checkout');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const client = new MongoClient('mongodb://127.0.0.1:27017');

async function conectarDB() {
    try {
        await client.connect();
        app.locals.db = client.db('ejercicios');
        console.log("🟢 MongoDB está conectado");
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error);
    }
}

conectarDB();
// Rutas
app.use('/clientes', clientesRouter);
app.use('/checkin', checkinRouter);
app.use('/checkout', checkoutRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
