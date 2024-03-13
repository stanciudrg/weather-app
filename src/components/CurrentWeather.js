import customFetch from "./customFetch";

export default class CurrentWeather {
  constructor(location) {
    this.location = location;
    this.data = {};
    this.error = "noError";
    this.container = document.createElement("div");
  }

  async init() {
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

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  displayData() {
    console.log(this.data);
  }

  setError(error) {
    this.error = error;
  }

  getError() {
    return this.error;
  }

  displayError() {
    console.log(this.error);
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
      temp: {
        c: target.current.temp_c,
        f: target.current.temp_f,
      },
      feelsLike: {
        c: target.current.feelslike_c,
        f: target.current.feelslike_f,
      },
      humidity: target.current.humidity,
      wind: {
        direction: target.current.wind_dir,
        kph: target.current.wind_kph,
        mph: target.current.wind_mph,
      },
    };

    return simplifiedCurrentWeatherData;
  }

  insertInto(element) {
    element.appendChild(this.container);
  }
}
