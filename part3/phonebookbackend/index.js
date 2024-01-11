const express = require("express");
const app = express();

app.use(express.json());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	const person = persons.find((p) => p.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.post("/api/persons", (request, response) => {
	const newPerson = request.body;
	newPerson.id = Math.floor(Math.random() * 1000000);

	persons = persons.concat(newPerson);

	response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((p) => p.id !== id);
});

app.get("/info", (request, response) => {
	const date = new Date();

	response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
