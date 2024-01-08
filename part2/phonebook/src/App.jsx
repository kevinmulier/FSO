import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const addContact = (event) => {
		event.preventDefault();

		const names = persons.map((person) => person.name);

		if (names.includes(newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		setPersons(persons.concat(personObject));
		setNewName("");
		setNewNumber("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const shownPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<>
			<h2>Phonebook</h2>
			<div>
				<p>
					filter shown with{" "}
					<input
						onChange={handleSearchChange}
						value={search}
					/>
				</p>
			</div>
			<h2>Add a new</h2>
			<form onSubmit={addContact}>
				<div>
					name:{" "}
					<input
						onChange={handleNameChange}
						value={newName}
					/>
				</div>
				<div>
					number:{" "}
					<input
						onChange={handleNumberChange}
						value={newNumber}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{shownPersons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
			<div>
				debug: {newName} {newNumber}
			</div>
		</>
	);
};

export default App;
