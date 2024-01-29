const express = require('express');
const ceros = require('./ceros.js')
const random = require('./random.js')
const app = express();
app.listen(3000);

app.get('/random', function(request, response) {
    response.send(random)
});


