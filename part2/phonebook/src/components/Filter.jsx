const Filter = ({ search, onChange }) => (
	<div>
		<p>
			filter shown with{" "}
			<input
				onChange={onChange}
				value={search}
			/>
		</p>
	</div>
);

export default Filter;
