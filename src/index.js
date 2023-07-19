let now = new Date();

function todayIs() {
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

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let today = `${day} ${hour}:${minutes}`;

  return today;
}

document.querySelector("#today").innerHTML = todayIs();

function search(city) {
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function cityName(event) {
  event.preventDefault();

  document.querySelector("#city").innerHTML = citySearched.value;

  let city = citySearched.value;
  search(city);
}

let citySearch = document.querySelector("#searching-form");
citySearch.addEventListener("submit", cityName);

function showWeather(response) {
  console.log(response);

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function currentLocation(position) {
  let units = "metric";
  let apiKey = "6643c7326a4c2a38838264a28531d97e";
  let weatherInfo = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${weatherInfo}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function currentButtonWeather() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentButtonWeather);

search("New York");
