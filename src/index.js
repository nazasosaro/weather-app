function refreshWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#weather-app-city-name");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let temperaturElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let conditionELement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  temperaturElement.innerHTML = Math.round(temperature);
  conditionELement.innerHTML = capitalizeFirstLetterOfEachWord(
    response.data.condition.description
  );
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
}

function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${date}, ${hours}:${minutes}`;
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeFirstLetterOfEachWord(sentence) {
  let words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }
  return words.join(" ");
}

function searchCity(city) {
  // make api call and update the interface
  let apiKey = "5c47dto7c39e0337bb7ea2f5ff0be23a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date"><strong>${day}</strong></div>
      <div class="weather-forecast-icon">🌧</div>
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>13°</strong>
        </div>
        <div class="weatherforecast">4°</div>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

displayForecast();
