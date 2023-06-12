function showTemperature(response) {
    console.log(response.data);
}

let apiKey = `9b041cb0e74745939f1d6ae898107fot`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Manila&key=${apiKey}`;


axios.get(apiUrl).then(showTemperature);

let city = document.querySelector("#main-city");
city.innerHTML = `Manila`;


