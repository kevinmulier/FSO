import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [search, setSearch] = useState(null);
	const [countries, setCountries] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);

	useEffect(() => {
		console.log("fetching countries...");
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				setCountries(response.data);
				console.log("fetched countries", response.data);
			});
	}, []);

	useEffect(() => {
		const newSelectedCountries = countries.filter((country) =>
			country.name.common.toLowerCase().includes(search.toLowerCase()),
		);
		setSelectedCountries(newSelectedCountries);
		console.log("changing selected countries", newSelectedCountries);
	}, [search]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const Countries = () => {
		if (selectedCountries.length > 0) {
			if (selectedCountries.length > 10) {
				return <p>Too many matches, specify another filter</p>;
			}

			if (selectedCountries.length === 1) {
				const selectedCountry = selectedCountries[0];

				return (
					<div>
						<h1>{selectedCountry.name.common}</h1>
						<p>capital {selectedCountry.capital[0]}</p>
						<p>area {selectedCountry.area}</p>
						<h2>languages:</h2>
						<ul>
							{Object.values(selectedCountry.languages).map((language) => (
								<li key={language}>{language}</li>
							))}
						</ul>
						<img
							src={selectedCountry.flags.png}
							alt={`Flag of ${selectedCountry.name.common}`}
						/>
					</div>
				);
			}

			return selectedCountries.map((country) => (
				<p key={country.name.common}>{country.name.common}</p>
			));
		}
		return <p>No country found with your research</p>;
	};

	return (
		<div>
			<p>
				find countries{" "}
				<input
					onChange={handleSearch}
					type="search"
				/>
			</p>
			<Countries />
		</div>
	);
}

export default App;
