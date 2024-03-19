import "./normalize.css";
import "./style.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import SearchResults from "./components/Search/SearchResults";
import SearchBar from "./components/Search/SearchBar";

const searchBar = new SearchBar(document.querySelector('body'));
searchBar.init();

const currentWeather = new CurrentWeather('Bucuresti');
const forecast = new Forecast('Bucuresti');

currentWeather.init();
forecast.init();