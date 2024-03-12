import customFetch from "./customFetch";

// Fetches the forecast JSON file for a specified location
// using the customFetch function
const fetchForecast = async (location) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=bd957ce5f33f49e692b105538240603&q=${location}&days=3`;
  const forecastData = await customFetch(url);
  return forecastData;
};
