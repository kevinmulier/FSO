const Persons = ({ shownPersons }) => (
	<>
		{shownPersons.map((person) => (
			<SinglePerson
				key={person.name}
				person={person}
			/>
		))}
	</>
);

const SinglePerson = ({ person }) => (
	<p>
		{person.name} {person.number}
	</p>
);

export default Persons;
