const PersonForm = ({
	newName,
	newNumber,
	addContact,
	handleNameChange,
	handleNumberChange,
}) => (
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
);

export default PersonForm;
