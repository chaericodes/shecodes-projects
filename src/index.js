// Sets the date and time to current setting
let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
days = days[now.getDay()];
months = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
let hour = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
  
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${months} ${date}, ${year}`;
  
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${days}`;
  
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

function getForecast(coordinates) {
  let apiKey = `9b041cb0e74745939f1d6ae898107fot`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
    let currentTemp = document.querySelector("#main-temperature");
    let feelsLike = document.querySelector("#feels-like-desc");
    let description = document.querySelector(".description");
    let currentCity = document.querySelector("#main-city");
    let humidity = document.querySelector("#humidity");
    let country = document.querySelector("#main-country");
    let icon = document.querySelector("#main-icon");
    let wind = document.querySelector("#wind");

    celsiusTemp = response.data.temperature.current;
    
    icon.setAttribute(`src`, `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    country.innerHTML = response.data.country;
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentCity.innerHTML = response.data.city;
    currentTemp.innerHTML = Math.round(celsiusTemp);
    description.innerHTML = response.data.condition.description;
    feelsLike.innerHTML = `Feels like ${Math.round(response.data.temperature.feels_like)} °C`;

    getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = `9b041cb0e74745939f1d6ae898107fot`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

let searchBtn = document.querySelector("#button-addon2");
searchBtn.addEventListener("click", handleSubmit);

function showCelsiusTemp (event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

function formatDay (timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function showForecast (response) {
  let castForecast = response.data.daily;
  let nextDayForecast = document.querySelector("#next-five-days");
  let nextDayForecastHTML = `<div class="row">`;

  castForecast.forEach(function(forecastDay, index) {
    if (index < 6) {
  nextDayForecastHTML = 
  nextDayForecastHTML + 
  `          
  <div class="col next-day">
    <ul>
      <li>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" id="forecast-icon-1" />
      </li>
      <li id="forecast-day-1"><small>${formatDay(forecastDay.time)}</small></li>
      <li class="next-day-temp-max">${Math.round(forecastDay.temperature.maximum)}° <span class="next-day-temp-min"> ${Math.round(forecastDay.temperature.minimum)}°</span</li>
    </ul>
  </div>`;
    }
  });
    

  nextDayForecastHTML = nextDayForecastHTML + `</div>`;
  nextDayForecast.innerHTML = nextDayForecastHTML;
}

let celsiusTemp = null;

search("Tanza");