import SearchBar from "./Search/SearchBar";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./Forecast/Forecast";
import measurementScales from "./helpers/measurementScales";

// Holds app's components
const weatherApp = {
  searchBar: new SearchBar(document.querySelector("body"), loadWeatherWidgets),
  widgets: {},
};

function loadSearchBar() {
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
function loadWeatherWidgets(location) {
  if (Object.keys(weatherApp.widgets).length > 0)
    destroyPreviousWeatherWidgets();
  weatherApp.widgets.currentWeather = new CurrentWeather(`id:${location}`);
  weatherApp.widgets.currentWeather.init();
  weatherApp.widgets.forecast = new Forecast(`id:${location}`);
  weatherApp.widgets.forecast.init();
}

// The location.id used on first app init
const defaultLocation = 2018920;

// Gets the country from which the website was accessed
async function getLocation() {
  const response = await fetch(
    "https://extreme-ip-lookup.com/json/?key=L85x6khYWEhMaPqwJpfg",
  );
  const responseData = await response.json();

  if (responseData.status === "fail") {
    throw new Error("Failed to fetch location");
  }

  return responseData.country;
}

export default async function init() {
  loadSearchBar();
  // Sets measurementScales properties based on user location
  try {
    const userLocation = await getLocation();
    if (userLocation === "United States") {
      measurementScales.temperature = "f";
      measurementScales.speed = "mph";
    } else {
      measurementScales.temperature = "c";
      measurementScales.speed = "kph";
    }
  } catch (error) {
    measurementScales.temperature = "c";
    measurementScales.speed = "kph";
  }

  loadWeatherWidgets(defaultLocation);
}
