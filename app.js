const iconEl = document.querySelector('.weather-icon')
const tempEl = document.querySelector('.temperature-value')
const descEl = document.querySelector('.temperature-description')
const locationsEl = document.querySelector('.location p')
const notificationEl = document.querySelector('.notification')

const weather = {};
weather.temperature =  {
  unit: 'celsius'
}

// Const and Variables
const KELVIN = 273;
const key = 'b8326b0c3843d9d18899e72d5d51c12b';

// Check if the browser supports Geolocalization
if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationEl.style.display = 'block';
  notificationEl.innerHTML = "<p> Browser doesn't support Geolocalization";
};

//Set User Position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
};

// Show Error when there is an issue with geolocalization Service
function showError(error) {
  notificationEl.style.display = 'block'
  notificationEl.innerHTML = `<p> ${error.message}`
};

// Get weather from API Provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  
  // console.log(api)
  fetch(api).then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function(){
    displayWeather();
  })
};

// Display Weather to UI
function displayWeather(){
  iconEl.innerHTML = `<img src="./images/${weather.iconId}.png" />`;
  tempEl.innerHTML = `${weather.temperature.value}º <span>C</span>`;
  descEl.innerHTML = weather.description;
  locationsEl.innerHTML = `${weather.city}, ${weather.country}`
}