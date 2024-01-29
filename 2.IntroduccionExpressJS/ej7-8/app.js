const express = require('express');
const ceros = require('./ceros.js')
const random = require('./random.js')

const app = express();

app.get('/random', function(request, response) {
    const randomNum = random()
    ceros[randomNum] += 1;
    response.send(ceros)
});

app.get('/borrar/:indice', (request, response) => {
    const indice = parseInt(request.params.indice, 10);

    if (isNaN(indice) || indice < 0 || indice >= ceros.length) {
        return response.status(400).send('Índice inválido');
    }

    ceros[indice] = 0;

    response.send(`Número en el índice ${indice} borrado. Array actualizado: ${ceros}`);
});

app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});

