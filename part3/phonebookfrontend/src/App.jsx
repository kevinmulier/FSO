import { useState, useEffect } from "react";

import axios from "axios";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService
			.getAll()
			.then((returnedPersons) => setPersons(returnedPersons));
	}, []);

	const addContact = (event) => {
		event.preventDefault();

		const names = persons.map((person) => person.name);

		if (names.includes(newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`,
				)
			) {
				const person = persons.find((person) => person.name === newName);

				const updatedPerson = {
					...person,
					number: newNumber,
				};

				personService
					.update(person.id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id !== updatedPerson.id ? p : updatedPerson,
							),
						);
						setNewName("");
						setNewNumber("");
						setSuccessMessage(`Updated number for ${person.name}`);
						setTimeout(() => {
							setSuccessMessage(null);
						}, 5000);
					})
					.catch((error) => {
						setErrorMessage(`The contact '${person.name}' wasn't found`);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
						setPersons(persons.filter((p) => p.id !== person.id));
					});
			}
			return;
		}

		const personObject = {
			name: newName,
			number: newNumber,
		};

		personService.create(personObject).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
			setSuccessMessage(`Added ${returnedPerson.name}`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		});
	};

	const deleteContact = (contact) => {
		if (window.confirm(`Delete ${contact.name} ?`)) {
			personService
				.deleteContact(contact.id)
				.then((response) => {
					setPersons(persons.filter((person) => person.id !== contact.id));
				})
				.catch((error) => {
					setErrorMessage(
						`Information of '${contact.name}' has already been removed from server`,
					);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
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
			<Notification
				message={successMessage}
				className="success"
			/>
			<Notification
				message={errorMessage}
				className="error"
			/>
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
