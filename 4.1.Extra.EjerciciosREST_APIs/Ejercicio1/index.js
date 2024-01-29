const infolibros = document.getElementById('infolibros');

fetch('http://gutendex.com/books/')
    .then((res) => res.json())
    .then((data) => {
        let books = data.results
        books.forEach(book => {
            showCard(book, infolibros)
        });
    })


const showCard = (book, infolibros) => {
    const titulo = book.title || "No disponible";
    const autor = book.authors[0].name ? book.authors[0].name : "Desconocido";
    const portadaURL = book.formats['image/jpeg'];

    const card = document.createElement("div");
    card.classList.add("card");

    const tituloElement = document.createElement("h3");
    tituloElement.textContent = `Título: ${titulo}`;

    const autorElement = document.createElement("p");
    autorElement.textContent = `Autor: ${autor}`;

    const portadaElement = document.createElement("img");
    portadaElement.src = portadaURL;
    portadaElement.alt = "Portada del libro";

    card.appendChild(tituloElement);
    card.appendChild(autorElement);
    card.appendChild(portadaElement);

    infolibros.appendChild(card);
}