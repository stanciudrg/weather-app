
import SearchBar from "./Search/SearchBar";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";

const weatherApp = {
  searchBar: new SearchBar(document.querySelector("body"), loadWeatherWidgets),
  widgets: {},
};

export function loadSearchBar() {
  weatherApp.searchBar.init();
}

function destroyPreviousWeatherWidgets() {
  Object.entries(weatherApp.widgets).forEach((entry) => {
    entry[1].destroy();
  });
}

export function loadWeatherWidgets(location) {
  if (Object.keys(weatherApp.widgets).length > 0)
    destroyPreviousWeatherWidgets();
  weatherApp.widgets.currentWeather = new CurrentWeather(`id:${location}`);
  weatherApp.widgets.currentWeather.init();
  weatherApp.widgets.forecast = new Forecast(`id:${location}`);
  weatherApp.widgets.forecast.init();
}

export const defaultLocation = 2018920;