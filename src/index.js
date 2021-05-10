function formatDate(props) {
  let now = new Date(props);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//function displaying forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <h1 class="forecast-day">${formatDay(forecastDay.dt)}</h1>
          <img src="/src/media/${forecastDay.weather[0].icon}.png" alt="${
          forecastDay.weather[0].description
        }" />
          <h3 class="forecast-temperature-min" >${Math.round(
            forecastDay.temp.min
          )} °C</h3>
          <h3 class="forecast-temperature-max" >${Math.round(
            forecastDay.temp.max
          )} °C</h3>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b61fef651891eb9cf133b7845c0e062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// function displaying weather info from API
function displayWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  tempC = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let datum = 1000 * response.data.dt;

  //     !!!                  to ADD: time, forecast
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}, ${country}`;

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(tempC);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(wind);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let datumElement = document.querySelector("#formatDate");
  datumElement.innerHTML = formatDate(datum);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `/src/media/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "b61fef651891eb9cf133b7845c0e062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// search engine
function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement.value) {
    let city = cityInputElement.value;
    citySearch(city);
  } else {
    alert(`Please enter a city to submit your search.`);
  }
}

function unitCelsius(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let currentTempC = document.querySelector("#temp");
  currentTempC.innerHTML = Math.round(tempC);
}
//
function unitFahrenheit(event) {
  event.preventDefault();
  let tempF = tempC * 1.8 + 32;
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let currentTempF = document.querySelector("#temp");
  currentTempF.innerHTML = Math.round(tempF);
}

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", unitFahrenheit);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", unitCelsius);

let tempC = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

citySearch("Stockholm");

// API call by current location
function gpsSearch(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b61fef651891eb9cf133b7845c0e062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// fetching current location
function fetchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(gpsSearch);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", fetchLocation);
