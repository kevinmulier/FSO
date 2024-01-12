const Persons = ({ shownPersons, deleteContact }) => (
	<>
		{shownPersons.map((person) => (
			<SinglePerson
				key={person.name}
				person={person}
				deleteContact={deleteContact}
			/>
		))}
	</>
);

const SinglePerson = ({ person, deleteContact }) => (
	<p>
		{person.name} {person.number}{" "}
		<button onClick={() => deleteContact(person)}>delete</button>
	</p>
);

export default Persons;
