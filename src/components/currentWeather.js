import customFetch from "./customFetch";

// Fetches the current weather JSON file for a specified location
// using the customFetch function
const fetchCurrentWeather = async (location) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=bd957ce5f33f49e692b105538240603&q=${location}`;
  const currentWeatherData = await customFetch(url);
  return currentWeatherData;
};

console.log(fetchCurrentWeather('London'))