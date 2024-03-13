import customFetch from "./customFetch";

// Returns an object containing the needed target properties only
const simplifyFetchedData = (target) => {
  const simplifiedForecastData = {
    days: [],
  };
  target.forecast.forecastday.forEach((day) => {
    const customDay = {
      date: day.date,
      condition: day.day.condition,
      avgTemp: {
        c: day.day.avgtemp_c,
        f: day.day.avgtemp_f,
      },
      maxTemp: {
        c: day.day.maxtemp_c,
        f: day.day.maxtemp_f,
      },
      minTemp: {
        c: day.day.mintemp_c,
        f: day.day.mintemp_f,
      },
      chanceOfRain: day.day.daily_chance_of_rain,
    };
    simplifiedForecastData.days.push(customDay);
  });

  return simplifiedForecastData;
};
export default class Forecast {
  constructor(location) {
    this.location = location;
    this.data = {};
    this.error = "noError";
    this.container = document.createElement("div");
  }

  async init() {
    try {
      const forecastData = await this.fetchData();;
      const simplifiedFetchedData = simplifyFetchedData(forecastData);
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

  setError(error) {
    this.error = error;
  }

  getData() {
    return this.data;
  }

  getError() {
    return this.error;
  }

  displayData() {
    console.log(this.data);
  }

  displayError() {
    console.log(this.error);
  }

  // Fetches the current weather JSON file for a specified location using the
  // customFetch function
  async fetchData() {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=bd957ce5f33f49e692b105538240603&q=${this.location}&days=3`;
    const forecastData = await customFetch(url);
  
    return forecastData;
  }

  insertInto(element) {
    element.appendChild(this.container);
  }
}
