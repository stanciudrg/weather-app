import customFetch from "./customFetch";

// Fetches the forecast JSON file for a specified location
// using the customFetch function
export const fetchForecast = async (location) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=bd957ce5f33f49e692b105538240603&q=${location}&days=3`;
  const forecastData = await customFetch(url);
  return forecastData;
};

// Fetches the forecastData and returns an object containing only the data needed for this app
export const getForecast = async (location) => {
  const forecastData = await fetchForecast(location);
  const simplifiedForecastData = {
    days: [],
  };
  
  forecastData.forecast.forecastday.forEach((day) => {
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

  return { forecastData, simplifiedForecastData };
};
