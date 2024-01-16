const people = require("../object")

function post(){
    fetch('/post', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
        )
    })
    let salida=''
    people.forEach((person) => {
        salida +=`
        <tr>
            <td>${person.name}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
        </tr>
        `
    })
    return `<table>
        <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
        </tr>
    </table>`
}

function put(){
    fetch('/put', {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            
        )
    })
}

function drop(){
    fetch('drop/', {
        method: 'DROP',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            
        )
    })
}