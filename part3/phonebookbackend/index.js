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

app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.json(persons);
		})
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			response.json(person);
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

	newPerson
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
	const date = new Date();
	Person.find({})
		.then((persons) => {
			response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
