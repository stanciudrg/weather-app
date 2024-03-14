import Weather from "./Weather";
import customFetch from "./customFetch";
import { measurementScales } from "./measurementScales";

export default class CurrentWeather extends Weather {
  constructor(location) {
    super();
    this.location = location;
  }

  async init() {
    super.init();
    this.container.id = 'current-weather';
    this.insertInto(document.querySelector('body'));

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

  displayData() {
    console.log(this.data);
    this.loadingAnimation.remove();
  }

  displayError() {
    console.log(this.error);
    this.loadingAnimation.remove();
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
      temp: target.current[`temp_${measurementScales.temperature}`],
      feelsLike: target.current[`feelslike_${measurementScales.temperature}`],
      humidity: target.current.humidity,
      wind: {
        direction: target.current.wind_dir,
        speed: target.current[`wind_${measurementScales.speed}`],
      },
    };

    return simplifiedCurrentWeatherData;
  }
}
