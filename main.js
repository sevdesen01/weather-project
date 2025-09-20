var elements = {
    form: document.querySelector("form"),
    searchBtn: document.querySelector("#search-btn"),
    fullDate: document.querySelector(".full-date"),
    time: document.querySelector(".date span:last-child"),
    city: document.querySelector(".city"),
    status: document.querySelector(".status"),
    img: document.querySelector(".icon img"),
    degree: document.querySelector(".degree span"),
    feel: document.querySelector(".feel"),
    hum: document.querySelector(".hum"),
    wind: document.querySelector(".wind"),
    sunrise: document.querySelector(".sunrise"),
    sunset: document.querySelector(".sunset"),
    max: document.querySelector(".max"),
    min: document.querySelector(".min"),
    locations: document.querySelector(".location"),
};

elements.form.addEventListener("submit", function(event){
    event.preventDefault();

    var city = event.target[0].value;

    getWeatherData(city);

    event.target[0].value = "";
});

function getWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0462c30b337632cc213ba696f4c5ff91&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      renderUi(data);
      console.log(data);
    });
}


function renderUi(data){
    elements.city.textContent = data.name;
    elements.status.textContent = data.weather[0].main;
    elements.img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    elements.degree.textContent = data.main.temp.toFixed(1) + "°";
    elements.feel.textContent = data.main.feels_like.toFixed(1) +  "°";
    elements.hum.textContent = data.main.humidity + "%";
    elements.wind.textContent = data.wind.speed + "km/h";
    elements.sunrise.textContent = new Date(
        data.sys.sunrise * 1000
    ).toLocaleTimeString("tr", {hour: "2-digit", minute:"2-digit"});
    elements.sunset.textContent = new Date(
        data.sys.sunset * 1000
    ).toLocaleTimeString("tr", {hour: "2-digit", minute:"2-digit"});
    elements.max.textContent = data.main.temp_max + "°";
    elements.min.textContent = data.main.temp_min + "°";
}

elements.locations.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        var cityName = event.target.textContent;
        getWeatherData(cityName);
    }
});

function renderDynamicDate(){
    var date = new Date();
    var dynamicDate = date.toLocaleDateString("Tr", {
        day: "2-digit",
        month:"long",
        year: "numeric",
    });
    var dynamicTime = date.toLocaleTimeString("Tr", {
        hour: "2-digit",
        minute: "numeric"
    });
    elements.fullDate.textContent =  dynamicDate;
    elements.time.textContent =  dynamicTime;
}

renderDynamicDate();


