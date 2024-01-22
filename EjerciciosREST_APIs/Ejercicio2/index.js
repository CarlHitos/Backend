//130 - 7526
const infolibros = document.getElementById('infolibros');

fetch('https://api.disneyapi.dev/characters/xxx')
    .then((res) => res.json())
    .then((data) => {
        let characters = data.data
        console.log(characters)
        // characters.forEach(character => {
        //     showCard(character)
        // });
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