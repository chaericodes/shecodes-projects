function showTemperature(response) {
    let currentTemp = document.querySelector("#main-temperature");
    let feelsLike = document.querySelector("#feels-like-desc");
    let description = document.querySelector(".description");
    let currentCity = document.querySelector("#main-city");
    let humidity = document.querySelector("#humidity");
    let icon = document.querySelector("#main-icon");
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentCity.innerHTML = response.data.city;
    currentTemp.innerHTML = Math.round(response.data.temperature.current);
    description.innerHTML = response.data.condition.description;
    feelsLike.innerHTML = `Feels like ${Math.round(response.data.temperature.feels_like)} °C`;


}

let apiKey = `9b041cb0e74745939f1d6ae898107fot`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Manila&key=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemperature);
