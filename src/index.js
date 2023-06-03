// Makes the searched word appear as the heading
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let heading = document.querySelector("li.main-country");
  if (city.value !== "") {
    heading.innerHTML = `${city.value}`;
  }
  let apiCity = city.value;
  let apiKey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=metric`
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  }

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let val = document.querySelector("#weather-value");
  val.innerHTML = `${temperature}`;
}

let searchBar = document.querySelector("#button-addon2");
searchBar.addEventListener("click", search);

function logCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logPosition);
}

function logPosition(position) {
  let apiKey = "8c78e9e7e9928cd1a2a6f923072c3dec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}


let currentLoc = document.querySelector("#crrnt-loc");
currentLoc.addEventListener("click", logCurrentPosition);

let value = document.querySelector("#weather-value");
let weather = document.querySelector("#weather-unit");
let unit = document.querySelector("#forecast");
unit.addEventListener("click", changeUnit);

  
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
  
// Changes the value and the unit of the weather based on the clicked link
// Default is Fahrenheit
function changeUnit(event) {
  let num = value.innerHTML;
  
  if (weather.innerHTML === " °C") {
    num = num * 1.8 + 32;
    num = Math.round(num);
    value.innerHTML = `${num}`;
    weather.innerHTML = ` °F`;
  } else {
    num = ((num - 32) * 5) / 9;
    num = Math.round(num);
    value.innerHTML = `${num}`;
    weather.innerHTML = ` °C`;
  }
}



