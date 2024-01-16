const express = require('express');
const app = express();

app.get('/random/:num', function(request, response) {
    let num = request.params.num;
    const randomNum = Math.floor(Math.random() * num) + 1;
    response.send('El numero aleatorio es ' + randomNum);
});


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.log('Servidor no conectado')
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});