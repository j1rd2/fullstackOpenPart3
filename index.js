const express = require('express');
const app = express();

let data = [
    {
        id: 1,
        name: "Kovo",
        number: "771 234 5313"

    },
    {
        id: 2,
        name: "Emi Pomar",
        number: "442 432 2341"
    },
    {
        id: 3,
        name: "Eli",
        number: "442 234 9493"
    },
    {
        id: 4,
        name: "Luis Leopoldo",
        number: "771 234 2341"
    },
    {
        id: 5,
        name: "Jesus Ramirez",
        number: "442 322 4345"
    }
]

app.get('/', (request, response) => {
    response.send('Main URL');
})

app.get('/api/persons', (request, response) => {
    response.json(data);
})

const PORT = 3001;

app.listen(PORT)
console.log(`Server running on port ${PORT}`)