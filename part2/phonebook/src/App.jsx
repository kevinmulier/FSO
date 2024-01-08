import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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

	return (
		<>
			<h2>Phonebook</h2>
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
			{persons.map((person) => (
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