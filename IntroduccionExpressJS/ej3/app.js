const express = require('express');
const app = express();


const people = ['tomas', 'natalia', 'richard', 'manuel', 'jose'];

app.get('/people', function(request, response) {
    response.send(people);
});


app.get('/people/:parametro', function(request, response) {
    let name = request.params.parametro;
    if (people.includes(name.toLocaleLowerCase())) {
        response.send(`Person found: ${name}`);
    } else {
        response.status(404).send(`Person not found: ${name}`);
    }
});


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});