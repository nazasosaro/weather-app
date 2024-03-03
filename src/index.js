function refreshWearher(response) {
  let temperaturElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city-name");

  cityElement.innerHTML = response.data.city;
  temperaturElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  // make api call and update the interface
  let apiKey = "5c47dto7c39e0337bb7ea2f5ff0be23a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWearher);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
