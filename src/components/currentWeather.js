import customFetch from "./customFetch";

// Fetches the current weather JSON file for a specified location
// using the customFetch function
export const fetchCurrentWeather = async (location) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=bd957ce5f33f49e692b105538240603&q=${location}`;
  const currentWeatherData = await customFetch(url);
  return currentWeatherData;
};

// Returns an object containing the needed target properties only
export const simplifyFetchedData = (target) => {
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