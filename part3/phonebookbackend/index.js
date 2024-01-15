require("dotenv").config();
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const app = express();

const Person = require("./models/person");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

morgan.token("content", function getContent(req) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :content",
	),
);

app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id).then((person) => {
		response.json(person);
	});
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name is missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "number is missing",
		});
	}

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	});

	newPerson.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id).then((result) => {
		response.status(204).end();
	});
});

app.get("/info", (request, response) => {
	const date = new Date();
	Person.find({}).then((persons) => {
		response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `);
	});
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
