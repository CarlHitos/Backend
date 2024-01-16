const express = require('express');
const app = express();


app.get('/', function (request, response) {
    response.send('<h1>Hola Mundo</h1><h2>desde express</h2>');
});

app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});