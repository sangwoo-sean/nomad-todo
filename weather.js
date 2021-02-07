const COORDS = "coords";
const API_KEY = "85039a0e13d58cad5a9a01ce73613a94";

const weather = document.querySelector(".js-weather");

function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then((result) => {
        return result.json();
    })
    .then((json) => {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${Math.round(temp)}ºC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${place}`
    })
}

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(pos) {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const coords = {
        latitude,
        longitude
    };
    saveCoords(coords)
    getWeather(latitude, longitude);
}

function handleGeoFail() {
    console.log("error");    
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
};

init();