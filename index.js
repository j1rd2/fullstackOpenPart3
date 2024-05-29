const express = require('express');
const moment = require('moment-timezone');

const app = express();

app.use(express.json()); // This line makes shure the server can handle json playload in request body


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
    response.send("Main URL");
})

app.get('/info', (request, response) => {
    const persons = data.length;
    const timeZone = 'America/Mexico_City';
    const time = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss z');

    
    response.send(`The phonebook has info for ${persons} people <br>Current time in ${timeZone}: ${time}`);
})

app.get('/api/persons', (request, response) => {
    response.json(data);
})

app.get('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404)
    }
})

app.delete('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(person => person.id !== id)
    response.status(404).end();

})

app.post('/api/persons', (request, response) => {
    
    const existingName = data.find(person => person.name === request.body.name);
    const existingNumber = data.find(person => person.number === request.body.number);


    if (!request.body.name || !request.body.number){
        return response.status(400).json({
            error: 'Missing data'
        });
    }

    if (existingName){
        return response.status(400).json({
            error: 'This name already exists, try again'
        })
    }

    if (existingNumber){
        return response.status(400).json({
            error: 'This number already exists, try again'
        })
    }

    const newId = Math.floor(Math.random() * 100000);

    // New object created with the data params 
    const newPerson = {
        id: newId,
        name: request.body.name,
        number: request.body.number
    };

    // NewPerson pushed into data
    data.push(newPerson);
    response.json(newPerson)
})

const PORT = 3001;

app.listen(PORT)
console.log(`Server running on port ${PORT}`)