
import SearchBar from "./Search/SearchBar";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";

// Holds app's components
const weatherApp = {
  searchBar: new SearchBar(document.querySelector("body"), loadWeatherWidgets),
  widgets: {},
};

export function loadSearchBar() {
  weatherApp.searchBar.init();
}

// Calls the destroy method of each object held by weatherApp.widgets.
// The function assumes that all widgets are classes that inherit from
// the WeatherWidget class and thus share its destroy() method
function destroyPreviousWeatherWidgets() {
  Object.entries(weatherApp.widgets).forEach((entry) => {
    entry[1].destroy();
  });
}

// Creates and initializes the weather widgets
export function loadWeatherWidgets(location) {
  if (Object.keys(weatherApp.widgets).length > 0)
    destroyPreviousWeatherWidgets();
  weatherApp.widgets.currentWeather = new CurrentWeather(`id:${location}`);
  weatherApp.widgets.currentWeather.init();
  weatherApp.widgets.forecast = new Forecast(`id:${location}`);
  weatherApp.widgets.forecast.init();
}

// The location.id used on first app init
export const defaultLocation = 2018920;