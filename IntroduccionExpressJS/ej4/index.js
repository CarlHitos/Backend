const express = require('express');
const saludarEnExpress = require('./function')
const app = express();


app.get('/saludar', function(request, response) {
    response.send(saludarEnExpress('Una String'));
});


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});