const express = require('express');
const app = express();

let alumnos = ['Carlos','Sergialys','Antonio','Ester','Nuria','Marina',]

app.get('/add/:profesores', function (request, response) {
    let profe = request.params.profesores;
    alumnos.push(profe);
    response.send(alumnos)
});


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});