
    fetch('/personas').then((res)=>res.json()).then((data) => {
        const li = document.getElementById('listpersons')
        data.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = `${person.name} ${person.lastName}, Edad: ${person.age}`;
            li.appendChild(listItem);
        });
    })