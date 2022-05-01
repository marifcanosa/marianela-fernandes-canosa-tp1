const API_KEY = "36180024d4959400a31cf9e3dd3fbd65";
const API_KEY_MAPA = "AIzaSyC05kFxApX3Tf9Fu4_CyvEX-SW3zVcuqSU";
const button = document.getElementById('button');
const input = document.getElementById('valor');
const divInfo = document.getElementById('info');
const divResultado = document.getElementById('resultado');
const divImg = document.getElementById('icono');
const main = document.getElementById('main');
const nombre = document.getElementById('nombre');
const divMapa = document.getElementById('mapa');
const gradosKelvin = 273.15;

window.onload = function () {
    if (localStorage.length != 0) {
        let valorGuardado = localStorage.getItem('lugar');
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${valorGuardado}&appid=${API_KEY}`)
        .then(function(response){
            return response.json();
        }).then(function(json){
            mostarResultado(json);
        }).catch(function(err) {
            console.log('Algo salio mal', err);
        });
    }
}

const pedirClima = ()=> {
    let valorBuscar = input.value;
    localStorage.setItem('lugar',valorBuscar);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${valorBuscar}&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        mostarResultado(json);
    }).catch(function(err) {
        console.log('Algo salio mal', err);
    });
}

function mostarResultado(data) {
    if (data.message == 'city not found') {
        divInfo.innerHTML = 'La ciudad, provincia o país ingresado no fue encontrado, intenta nuevamente.'
        divImg.innerHTML = '';
        nombre.innerHTML = '';
        divMapa.innerHTML = '';
    }
    else {
        let nombreLugar = data.name;
        let estadoClima = (data.weather[0].main).toLowerCase();
        let tempMax = Math.round(data.main.temp_max - gradosKelvin);
        let tempMin = Math.round(data.main.temp_min - gradosKelvin);
        let humedad = data.main.humidity;
        let sencacionTermica = Math.round(data.main.feels_like - gradosKelvin);
        let presionAtm = data.main.pressure;
        let velocidadViento = data.wind.speed;
        let iconID = data.weather[0].icon;
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let climaEs;
        divImg.innerHTML = '';
        nombre.innerHTML = '';
        divMapa.innerHTML = '';
    
        switch (estadoClima) {
            case 'rain': {
                climaEs = 'lluvioso';
                divResultado.style.backgroundColor = 'rgba(3, 9, 45, 0.5)';
            }
            break;
            case 'clouds': {
                climaEs = 'nublado';
                divResultado.style.backgroundColor = 'rgba(32, 32, 32, 0.5)';
            }
            break;
            case 'clear': {
                climaEs = 'despejado';
                divResultado.style.backgroundColor = 'rgba(230, 61, 0, 0.5)';
            }
            break;
            case 'snow': {
                climaEs = 'nevando';
                divResultado.style.backgroundColor = 'rgba(2, 78, 90, 0.5)';
            }
            break;
            case 'thunderstorm': {
                climaEs = 'tormentoso';
                divResultado.style.backgroundColor = 'rgba(6, 4, 45, 0.5)';
            }
            break;
            case 'drizzle': {
                climaEs = 'lloviznando';
                divResultado.style.backgroundColor = 'rgba(0, 44, 83, 0.5)';
            }
            break;
            case 'mist': {
                climaEs = 'con neblina';
                divResultado.style.backgroundColor = 'rgba(166, 166, 166, 0.5)';
            }
            break;
            case 'smoke': {
                climaEs = 'con humo';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'haze': {
                climaEs = 'con niebla y polvo';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'dust': {
                climaEs = 'con polvo';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'fog': {
                climaEs = 'con niebla';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'sand': {
                climaEs = 'con arena';
                divResultado.style.backgroundColor = 'rgba(230, 138, 0, 0.5)';
            }
            break;
            case 'ash': {
                climaEs = 'con ceniza';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'squall': {
                climaEs = 'con chubascos aislados';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
            case 'tornado': {
                climaEs = 'con tornados';
                divResultado.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
            }
            break;
        };

        fetch(`http://openweathermap.org/img/wn/${iconID}@2x.png`)
        .then(function(response){
            return response;
        }).then(function(data){
            divImg.innerHTML = `<img src="${data.url}" alt="icono-clima">`;
        }).catch(function(err){
            console.log('Algo salió mal', err);
        })

        fetch(`https://www.google.com/maps/embed/v1/view?key=${API_KEY_MAPA}&center=${lat},${lon}&zoom=10&maptype=satellite`)
        .then(function(response){
            return response;
        }).then(function(data){
            divMapa.innerHTML = `<iframe width="600" height="250" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="${data.url}" allowfullscreen></iframe>`;
        }).catch(function(err){
            console.log('Algo salió mal', err);
        })

        nombre.innerHTML  = `El clima en <strong> ${nombreLugar} </strong> esta ${climaEs}`
        divInfo.innerHTML = `<p>Temp. Max: ${tempMax}°C </p>
                             <p>Temp. Min: ${tempMin}°C</p>
                             <p>Sensación Térmica: ${sencacionTermica}°C</p>
                             <p>Humedad: ${humedad}%</p>
                             <p>Presión Atmosférica: ${presionAtm} hPa</p>
                             <p>Velocidad del Viento: ${velocidadViento} km/h</p>`;
    }
}

button.addEventListener('click', pedirClima);