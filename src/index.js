import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import SearchResults from "./components/SearchResults";

async function renderCurrentWeather(location) {
    const currentWeather = new CurrentWeather(location);
    await currentWeather.init();
    console.log(currentWeather)
}

renderCurrentWeather('Bucuresti');

async function renderForecast(location) {
    const forecast = new Forecast(location);
    await forecast.init();
    console.log(forecast)
}

renderForecast('Bucuresti');

async function renderSearchResults(parameters) {
    const searchResults = new SearchResults(parameters);
    await searchResults.init();
    console.log(searchResults)
}

renderSearchResults('Bras');