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
    let index = persons.findIndex((person)=> person.name === request.body.name)

    if(index < 0) response.send('El nombre ' + request.body.name + ' no existe en la BBDD')

    persons[index].lastName = request.body.lastName;
    persons[index].age = request.body.age;

    response.send(`${request.body.name} ha sido modificado correctamente`)
});

app.delete('/delete', function (request, response) {
    let index = persons.findIndex((person)=> person.name === request.body.name)

    if(index < 0){ 
        response.send('El nombre ' + request.body.name + ' no existe en la BBDD')
    }else {
        persons.splice(index, 1)
        response.send(`${request.body.name} ha sido borrado correctamente`)
    }
});


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});