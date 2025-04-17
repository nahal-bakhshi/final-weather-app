function formatday(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayelement = days[now.getDay()];
  return `${dayelement}`;
}

function formatmonth(now) {
  let month = [
    "January",
    "Februry",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];
  let monthelement = month[now.getMonth()];
  let dateelement = now.getDate();
  return `${monthelement} ${dateelement}`;
}

function formattime(now) {
  let hours = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hours}:${minute}`;
}

function adddata(response) {
  let currentcity = document.querySelector("#city-name");
  let currentcountry = document.querySelector("#country-name");
  let currenttemperature = document.querySelector("#temperature");
  let currentunit = document.querySelector("#unit");
  let unit = "°C";
  let currentlike = document.querySelector("#feel-like");
  let currenthumidity = document.querySelector("#humidity");
  let currenticon = document.querySelector("#icon");
  let now = new Date();
  let currentday = document.querySelector("#day");
  let currentwind = document.querySelector("#wind");
  let currentmonth = document.querySelector("#month");
  let currentcodition = document.querySelector("#condition");
  let currenttime = document.querySelector("#time");

  currentcity.innerHTML = response.data.city;
  currentcountry.innerHTML = response.data.country;
  currenttemperature.innerHTML = Math.round(response.data.temperature.current);
  currentunit.innerHTML = unit;
  currentlike.innerHTML = `feels like ${Math.round(
    response.data.temperature.feels_like
  )}`;
  currenthumidity.innerHTML = `Humidity ${response.data.temperature.humidity} `;
  currenticon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  currentday.innerHTML = formatday(now);
  currentwind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
  currentmonth.innerHTML = formatmonth(now);
  currentcodition.innerHTML = response.data.condition.description;
  currenttime.innerHTML = formattime(now);
  getforcast(response.data.city);
}

function searchcity(city) {
  let apikey = "51dca49dt4a130a3a0145dff90d8o3ba";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiurl).then(adddata);
}

function searchsubmit(event) {
  event.preventDefault();
  let cityelement = document.querySelector("#search-city");
  searchcity(cityelement.value);
}
function getforcast(city) {
  let apikey = "51dca49dt4a130a3a0145dff90d8o3ba";
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;
  axios.get(apiurl).then(displayforcast);
}

function formatfarcastday(forcastday) {
  let date = new Date(forcastday * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayforcast(response) {
  let forcasthtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcasthtml =
        forcasthtml +
        `  <div class="weather-forcast-day">
  <div class="weather-forcast-date">${formatfarcastday(day.time)}</div>
  
  <img src="${day.condition.icon_url}" class="weather-forcast-icon"/>
  
  <div class="weather-forcast-temperatures">
    <div class="weather-forcast-temperature">
      <strong>${Math.round(day.temperature.minimum)}°</strong>
    </div>
    <div class="weather-forcast-temperature">/${Math.round(
      day.temperature.maximum
    )}°</div>
  </div>
  </div>`;
    }
  });
  let forcastelement = document.querySelector("#forcast");
  forcastelement.innerHTML = forcasthtml;
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", searchsubmit);

searchcity("paris");
