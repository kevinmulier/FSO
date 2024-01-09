import { useState, useEffect } from "react";

import axios from "axios";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		personService
			.getAll()
			.then((returnedPersons) => setPersons(returnedPersons));
	}, []);

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
			id: `${persons.length + 1}`,
		};

		personService.create(personObject).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
		});
	};

	const deleteContact = (contact) => {
		if (window.confirm(`Delete ${contact.name} ?`)) {
			personService
				.deleteContact(contact.id)
				.then((returnedPerson) => {
					setPersons(
						persons.filter((person) => person.id !== returnedPerson.id),
					);
				})
				.catch((error) => {
					alert(
						`the contact '${contact.name}' was already deleted from server`,
					);
					setPersons(persons.filter((person) => person.id !== contact.id));
				});
		}
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
			<Filter
				search={search}
				onChange={handleSearchChange}
			/>
			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				addContact={addContact}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons
				shownPersons={shownPersons}
				deleteContact={deleteContact}
			/>
		</>
	);
};

export default App;
