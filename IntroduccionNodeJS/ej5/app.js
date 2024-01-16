const objData = require('./module.js')
const allCountries = []

for (const countries of Object.values(objData.paises)) {
    for (const country of countries) {
        allCountries.push(country);
    }
}

const favCountries = objData.favoritos.map(fav => allCountries[fav - 1] )

console.log(`Los paises favoritos de ${objData.nombre} son ${favCountries}`)