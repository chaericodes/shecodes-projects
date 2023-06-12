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

function showTemperature(response) {
    let currentTemp = document.querySelector("#main-temperature");
    let feelsLike = document.querySelector("#feels-like-desc");
    let description = document.querySelector(".description");
    let currentCity = document.querySelector("#main-city");
    let humidity = document.querySelector("#humidity");
    let country = document.querySelector("#main-country");
    let icon = document.querySelector("#main-icon");
    let wind = document.querySelector("#wind");
    icon.setAttribute(`src`, `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    country.innerHTML = response.data.country;
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentCity.innerHTML = response.data.city;
    currentTemp.innerHTML = Math.round(response.data.temperature.current);
    description.innerHTML = response.data.condition.description;
    feelsLike.innerHTML = `Feels like ${Math.round(response.data.temperature.feels_like)} °C`;


}

let apiKey = `9b041cb0e74745939f1d6ae898107fot`;
let city = `Manila`
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature);
