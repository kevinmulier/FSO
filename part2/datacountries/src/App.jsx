import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [weatherInfo, setWeatherInfo] = useState(null);

	const api_key = import.meta.env.VITE_SOME_KEY;

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

		if (newSelectedCountries.length === 1) {
			if (
				(weatherInfo &&
					newSelectedCountries[0].altSpellings[0] !==
						weatherInfo.sys.country) ||
				!weatherInfo
			) {
				const selectedCountry = newSelectedCountries[0];
				setWeatherInfo({});

				axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`,
					)
					.then((response) => {
						setWeatherInfo(response.data);
						console.log("weather info", response.data);
					});
			}
		}
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
				let temp, weatherIcon, weatherText, windSpeed;

				if (Object.keys(weatherInfo).length > 0) {
					temp = weatherInfo.main.temp;
					weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
					weatherText = weatherInfo.weather[0].main;
					windSpeed = weatherInfo.wind.speed;
				}

				return (
					<div>
						<h2>{selectedCountry.name.common}</h2>
						<p>capital {selectedCountry.capital[0]}</p>
						<p>area {selectedCountry.area}</p>
						<h3>languages:</h3>
						<ul>
							{Object.values(selectedCountry.languages).map((language) => (
								<li key={language}>{language}</li>
							))}
						</ul>
						<img
							src={selectedCountry.flags.png}
							alt={`Flag of ${selectedCountry.name.common}`}
						/>
						<h2>Weather in {selectedCountry.capital[0]}</h2>
						{Object.keys(weatherInfo).length > 0 && (
							<>
								<p>temperature {temp} Celcius</p>
								<img
									src={weatherIcon}
									alt={weatherText}
								/>
								<p>wind {windSpeed} m/s</p>
							</>
						)}
					</div>
				);
			}

			return selectedCountries.map((country) => (
				<p key={country.name.common}>
					{country.name.common}{" "}
					<button onClick={() => setSearch(country.name.common)}>show</button>
				</p>
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
					value={search}
					type="search"
				/>
			</p>
			<Countries />
		</div>
	);
}

export default App;
