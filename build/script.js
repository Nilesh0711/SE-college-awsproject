let weather = {
  apiKey: "f0d8a6d507ae47e781c100438221507",
  fetchWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q=" + city + "&aqi=no"
    )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data1) {
    const name = data1['location']['name'];
    // const { icon, description } = data1.weather[0];
    const temp  = data1['current']['temp_c'];
    const humidity = data1['current']['humidity'];
    const speed  = data1['current']['wind_kph'];
    document.querySelector(".city").innerText = "Weather in " + name;
    // document.querySelector(".icon").src =
      // "https://openweathermap.org/img/wn/" + icon + ".png";
    // document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
