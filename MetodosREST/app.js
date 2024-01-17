const express = require('express');
const persons = require('./object')
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/personas', function (request, response) {
    response.send(persons);
});

app.post('/sumar', function (request, response) {
    const {name, lastName, age} = request.body
    persons.push({name, lastName, age})
    response.send(persons)
});

app.put('/put', function (request, response) {
    response.send(persons);
});

app.delete('/delete', function (request, response) {
    response.send(persons);
});


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});