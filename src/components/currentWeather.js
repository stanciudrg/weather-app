import customFetch from "./customFetch";

// Fetches the current weather JSON file for a specified location
// using the customFetch function
export const fetchCurrentWeather = async (location) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=bd957ce5f33f49e692b105538240603&q=${location}`;
  const currentWeatherData = await customFetch(url);
  return currentWeatherData;
};

// Fetches the currentWeatherData and returns an object containing only the data needed for this app
export const getCurrentWeather = async (location) => {
  const currentWeatherData = await fetchCurrentWeather(location);
  const simplifiedCurrentWeatherData = {
    condition: currentWeatherData.current.condition,
    temp: {
      c: currentWeatherData.current.temp_c,
      f: currentWeatherData.current.temp_f,
    },
    feelsLike: {
      c: currentWeatherData.current.feelslike_c,
      f: currentWeatherData.current.feelslike_f,
    },
    humidity: currentWeatherData.current.humidity,
    wind: {
      direction: currentWeatherData.current.wind_dir,
      kph: currentWeatherData.current.wind_kph,
      mph: currentWeatherData.current.wind_mph,
    },
  };

  return simplifiedCurrentWeatherData;
};
