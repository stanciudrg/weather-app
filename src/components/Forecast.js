import Weather from "./Weather";
import customFetch from "./customFetch";
import { measurementScales } from "./measurementScales";

export default class Forecast extends Weather {
  constructor(location) {
    super();
    this.location = location;
  }

  async init() {
    super.init();
    this.insertInto(document.querySelector('body'));

    try {
      const forecastData = await this.fetchData();
      const simplifiedFetchedData = Forecast.simplifyFetchedData(forecastData);
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

  // Fetches the forecast JSON file for a specified location using the
  // customFetch function
  async fetchData() {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=bd957ce5f33f49e692b105538240603&q=${this.location}&days=3`;
    const forecastData = await customFetch(url);

    return forecastData;
  }

  // Returns an object containing the needed target properties only
  static simplifyFetchedData(target) {
    const simplifiedForecastData = {
      days: [],
    };
    target.forecast.forecastday.forEach((day) => {
      const customDay = {
        date: day.date,
        condition: day.day.condition,
        avgTemp: day.day[`avgtemp_${measurementScales.temperature}`],
        maxTemp: day.day[`maxtemp_${measurementScales.temperature}`],
        minTemp: day.day[`mintemp_${measurementScales.temperature}`],
        chanceOfRain: day.day.daily_chance_of_rain,
      };
      simplifiedForecastData.days.push(customDay);
    });

    return simplifiedForecastData;
  }
}
