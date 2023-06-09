let apiKey = "e6fdbebba6d6f76e9a50f7444eca5b52";

let searchForm = document.querySelector("form");
let cityName = document.querySelector(".city");
let temperature = document.querySelector(".temperature");

// Get current date and time
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
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
let time = `${day} ${hours}:${minutes}`;

// Display current date and time
let dateTime = document.createElement("h5");
dateTime.textContent = time;
cityName.after(dateTime);

// Time format
if (hours < 10){
    console.log(`$0{hours}`)
}

if (minutes < 10){
    console.log(`$0{minutes}`);
}

// Add event listener to the search form
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = searchForm.elements.search.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
    })
    .catch((error) => {
      cityName.textContent = error.message;
      temperature.textContent = "";
    });
});
