const express = require('express');
const app = express();

const persona = {
    nombre: '',
    apellidos: '',
    edad: 0
}

app.get('/nombre/:nombre', function (request, response) {
    persona.nombre = request.params.nombre;
    response.send(persona)
});

app.get('/apellidos/:apellidos', function (request, response) {
    persona.apellidos = request.params.apellidos;
    response.send(persona)
});

app.get('/edad/:edad', function (request, response) {
    persona.edad = request.params.edad;
    response.send(persona)
});



app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});