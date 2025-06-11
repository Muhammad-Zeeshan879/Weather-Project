const apiKey = "ac46846f92b652500ce383c3d3519bc2"; // OpenWeatherMap API key

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  weatherResult.innerHTML = "Loading...";

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const weatherDesc = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherResult.innerHTML = `
    <h2>Weather in ${name}</h2>
    <img src="${iconURL}" alt="${weatherDesc}" />
    <p>Temperature: ${temp}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Condition: ${weatherDesc}</p>
  `;
}
