import "./CurrentWeather.css";
import WeatherWidget from "../WeatherWidget";
import customFetch from "../helpers/customFetch";
import measurementScales from "../helpers/measurementScales";

export default class CurrentWeather extends WeatherWidget {
  constructor(location) {
    super();
    // Parameter used to fetch current weather data
    this.location = location;
  }

  // Calls super to initialize loading animation then fills super's container
  // with the result of the Promise
  async init() {
    super.init();
    this.container.id = "current-weather";
    this.insertInto(document.querySelector("body"));

    try {
      const currentWeatherData = await this.fetchData();
      const simplifiedFetchedData =
        CurrentWeather.simplifyFetchedData(currentWeatherData);
      this.setData(simplifiedFetchedData);
      this.displayData();
    } catch (error) {
      this.setError(error);
      this.displayError();
    }
  }

  // Replaces the loading animation started by super with the DOM content
  // that holds the fetched data of CurrentWeather
  displayData() {
    this.loadingAnimation.remove();

    const title = document.createElement("h2");
    title.classList.add("current-weather_location");
    title.textContent = `${this.data.name}, ${this.data.country}`;
    this.container.appendChild(title);

    const temperature = document.createElement("div");
    temperature.classList.add("current-weather_temperature");
    temperature.textContent = this.data.temp;
    this.container.appendChild(temperature);

    const condition = document.createElement("div");
    condition.classList.add("current-weather_condition");
    this.container.appendChild(condition);

    const conditionText = document.createElement("div");
    conditionText.classList.add("current-weather_condition-text");
    conditionText.textContent = this.data.condition.text;
    condition.appendChild(conditionText);

    const conditionIcon = document.createElement("img");
    conditionIcon.classList.add("current-weather_condition-icon");
    conditionIcon.src = this.data.condition.icon;
    condition.appendChild(conditionIcon);

    const additionalInfo = document.createElement("div");
    additionalInfo.classList.add("current-weather_additional-info");
    this.container.appendChild(additionalInfo);

    const feelsLike = document.createElement("div");
    feelsLike.classList.add("current-weather_feelslike");
    additionalInfo.appendChild(feelsLike);

    const feelsLikeTitle = document.createElement("div");
    feelsLikeTitle.classList.add("current-weather_feelslike-title");
    feelsLikeTitle.textContent = "Feels like";
    feelsLike.appendChild(feelsLikeTitle);

    const feelsLikeValue = document.createElement("div");
    feelsLikeValue.classList.add("current-weather_feelslike-value");
    feelsLikeValue.textContent = `${this.data.feelsLike}\u00B0`;
    feelsLike.appendChild(feelsLikeValue);

    const humidity = document.createElement("div");
    humidity.classList.add("current-weather_humidity");
    additionalInfo.appendChild(humidity);

    const humidityTitle = document.createElement("div");
    humidityTitle.classList.add("current-weather_humidity-title");
    humidityTitle.textContent = "Humidity";
    humidity.appendChild(humidityTitle);

    const humidityValue = document.createElement("div");
    humidityValue.classList.add("current-weather_humidity-value");
    humidityValue.textContent = `${this.data.humidity}%`;
    humidity.appendChild(humidityValue);

    const wind = document.createElement("div");
    wind.classList.add("current-weather_wind");
    additionalInfo.appendChild(wind);

    const windTitle = document.createElement("div");
    windTitle.classList.add("current-weather_wind-title");
    windTitle.textContent = "Wind";
    wind.appendChild(windTitle);

    const windValue = document.createElement("div");
    windValue.classList.add("current-weather_wind-value");
    windValue.textContent = `${this.data.wind.speed} ${measurementScales.speed}`;
    wind.appendChild(windValue);
  }

  // Replaces the loading animation started by super with the DOM content
  // that holds the error name and error details of the fetch operation
  displayError() {
    this.loadingAnimation.remove();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("current-weather_error");
    this.container.appendChild(errorMessage);

    const errorTitle = document.createElement("h2");
    errorTitle.classList.add("current-weather_error-title");
    errorTitle.textContent = "Unable to retrieve weather data";
    errorMessage.appendChild(errorTitle);

    const errorValue = document.createElement("p");
    errorValue.classList.add("current-weather_error-value");
    errorValue.textContent = this.error;
    errorMessage.appendChild(errorValue);
  }

  // Fetches the current weather JSON file for a specified location using the
  // customFetch function
  async fetchData() {
    if (!this.location) throw new Error("Location not provided");
    const url = `https://api.weatherapi.com/v1/current.json?key=bd957ce5f33f49e692b105538240603&q=${this.location}`;
    const currentWeatherData = await customFetch(url);

    return currentWeatherData;
  }

  // Returns an object containing the needed target properties only
  static simplifyFetchedData(target) {
    const simplifiedCurrentWeatherData = {
      name: target.location.name,
      country: target.location.country,
      condition: target.current.condition,
      temp: Math.round(target.current[`temp_${measurementScales.temperature}`]),
      feelsLike: Math.round(
        target.current[`feelslike_${measurementScales.temperature}`],
      ),
      humidity: target.current.humidity,
      wind: {
        direction: target.current.wind_dir,
        speed: target.current[`wind_${measurementScales.speed}`],
      },
    };

    return simplifiedCurrentWeatherData;
  }
}
