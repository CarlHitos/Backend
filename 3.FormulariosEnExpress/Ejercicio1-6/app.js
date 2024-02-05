const express = require('express');
const app = express();
app.use(express.static('public'))

let animals = [
    {
        name: "Leon",
        age: 10,
        type: "Mamifero"
    },
    {
        name: "Elefante",
        age: 7,
        type: "Mamifero"
    },
    {
        name: "Perro",
        age: 9,
        type: "Mamifero"
    },
    {
        name: "Loro",
        age: 1,
        type: "Ave"
    }
]


app.get('/list', function (req, res) {
    res.send(animalPrint("Lista de animales", animals));
});

app.get('/add-animal', function (req, res) {
    let { name, age, type } = req.query
    age = parseInt(age)

    animals.push({ name, age, type })
    res.send({ mensaje: `${name} añadido`, results: animals })
})

app.get('/adopt', function(req,res){
    animals = animals.filter((animal) => animal.name != req.query.name)
    res.send(animalPrint(`Animal adoptado`,animals))
})

function animalPrint(msg, animals) {
    let salida = ""
    for (let i = 0; i < animals.length; i++) {
        salida += ` 
        <tr>
            <td>${animals[i].name}</td>
            <td>${animals[i].type}</td>
            <td>${animals[i].age}</td>
            <td> 
                <form action="/adopt">
                <input type="text" hidden name="name" value="${animals[i].name}" id="name">
                <button type="submit">Adoptar</button>
                </form>
            </td>
        </tr>`
    }

    return `
            <h3>${msg}</h3>
            <table>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Edad</th>
            </tr>
            ${salida}
        </table>`
}

app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.log('Servidor no conectado')
        : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
});