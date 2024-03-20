import { isToday, parseISO, intlFormatDistance, format } from "date-fns";
import "./Forecast.css";
import WeatherWidget from "../WeatherWidget";
import customFetch from "../helpers/customFetch";
import measurementScales from "../helpers/measurementScales";

export default class Forecast extends WeatherWidget {
  constructor(location) {
    super();
    // Parameter used to fetch forecast data
    this.location = location;
  }

  // Calls super to initialize loading animation then fills super's container
  // with the result of the Promise
  async init() {
    super.init();
    this.container.id = "forecast";
    this.insertInto(document.querySelector("body"));

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

  // Replaces the loading animation started by super with the DOM content
  // that holds the fetched data of Forecast
  displayData() {
    this.loadingAnimation.remove();

    const title = document.createElement("h2");
    title.classList.add("forecast_title");
    title.textContent = `${this.data.days.length}-Day Forecast`;
    this.container.appendChild(title);

    const days = document.createElement("div");
    days.classList.add("forecast_days");
    this.container.appendChild(days);

    this.data.days.forEach((day) => {
      const dayContainer = document.createElement("div");
      dayContainer.classList.add("forecast_day");
      days.appendChild(dayContainer);

      const dayPrimaryInfo = document.createElement("div");
      dayPrimaryInfo.classList.add("forecast_day-primary-info");
      dayContainer.appendChild(dayPrimaryInfo);

      const dayTitle = document.createElement("h3");
      dayTitle.classList.add("forecast_day-title");
      dayTitle.textContent = Forecast.formatDate(day.date);
      dayPrimaryInfo.appendChild(dayTitle);

      const dayCondition = document.createElement("div");
      dayCondition.classList.add("forecast_day-condition");
      dayPrimaryInfo.appendChild(dayCondition);

      const dayConditionIcon = document.createElement("img");
      dayConditionIcon.classList.add("forecast_day-condition-icon");
      dayConditionIcon.src = day.condition.icon;
      dayCondition.appendChild(dayConditionIcon);

      if (day.chanceOfRain > 5) {
        const chanceOfRain = document.createElement("div");
        chanceOfRain.classList.add("forecast_day-condition-cor");
        chanceOfRain.textContent = `${day.chanceOfRain}%`;
        dayCondition.appendChild(chanceOfRain);
      }

      const daySecondaryInfo = document.createElement("div");
      daySecondaryInfo.classList.add("forecast_day-secondary-info");
      dayContainer.appendChild(daySecondaryInfo);

      const minTemp = document.createElement("div");
      minTemp.classList.add("forecast_day-min-temp");
      minTemp.textContent = `${day.minTemp}\u00B0`;
      daySecondaryInfo.appendChild(minTemp);

      const dash = document.createElement("div");
      dash.classList.add("forecast_day-temp-dash");
      daySecondaryInfo.appendChild(dash);

      const maxTemp = document.createElement("div");
      maxTemp.classList.add("forecast_day-max-temp");
      maxTemp.textContent = `${day.maxTemp}\u00B0`;
      daySecondaryInfo.appendChild(maxTemp);
    });
  }

  // Replaces the loading animation started by super with the DOM content
  // that holds the error name and error details of the fetch operation
  displayError() {
    this.loadingAnimation.remove();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("forecast_error");
    this.container.appendChild(errorMessage);

    const errorTitle = document.createElement("h2");
    errorTitle.classList.add("forecast_error-title");
    errorTitle.textContent = "Unable to retrieve weather data";
    errorMessage.appendChild(errorTitle);

    const errorValue = document.createElement("p");
    errorValue.classList.add("forecast_error-value");
    errorValue.textContent = this.error;
    errorMessage.appendChild(errorValue);
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
        maxTemp: Math.round(
          day.day[`maxtemp_${measurementScales.temperature}`],
        ),
        minTemp: Math.round(
          day.day[`mintemp_${measurementScales.temperature}`],
        ),
        chanceOfRain: day.day.daily_chance_of_rain,
      };
      simplifiedForecastData.days.push(customDay);
    });

    return simplifiedForecastData;
  }

  // Returns a custom formatted date string
  static formatDate(date) {
    // See 'date-fns' JavaScript library documentation for more information
    // regarding the methods used within this function
    if (!date) return "";

    if (isToday(date)) {
      const word = intlFormatDistance(parseISO(date), new Date(), {
        unit: "day",
      });
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return format(parseISO(date), "EE");
  }
}
