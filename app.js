const api = {
	key: "d73a2cc55b6b9e0a7ab8d926572281fd",
	baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if (evt.keyCode == 13) {
		getResults(searchBox.value);
	}
}

function getResults(query) {
	fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
		}).then(displayResults);
}

function displayResults (weather) {
	let city = document.querySelector('.location .city');
	city.innerHTML = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerText = dateBuilder(now);

	let temp = document.querySelector('.current .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C<span>`;

	let weather_el = document.querySelector('.current .weather');
	weather_el.innerText = weather.weather[0].main;

	let hilow = document.querySelector('.hi-low');
	hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
	let months = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
	let days = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}











