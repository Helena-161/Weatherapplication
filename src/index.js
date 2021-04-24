let now = new Date();
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
  "Saturday"
];
let day = days[now.getDay()];
let formatDate = document.querySelector("#formatDate");
formatDate.innerHTML = `${day}, ${hours}:${minutes}`;

// function displaying weather info from API
function displayWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;

  tempC = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}, ${country}`;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(tempC);
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
  let currentTempC = document.querySelector("#temp");
  currentTempC.innerHTML = Math.round(tempC);
}

function unitFahrenheit(event) {
  event.preventDefault();
  let tempF = tempC * 1.8 + 32;
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
