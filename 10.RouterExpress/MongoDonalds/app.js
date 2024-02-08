const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const hamburguesasRoutes = require('./routes/hamburguesas');
const bebidasRoutes = require('./routes/bebidas');
const pedidoRoutes = require('./routes/pedidos');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))


app.use('/menu', menuRoutes);
app.use('/hamburguesas', hamburguesasRoutes);
app.use('/bebidas', bebidasRoutes);
app.use('/pedido', pedidoRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
