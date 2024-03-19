import "./normalize.css";
import "./style.css";
import { loadSearchBar, loadWeatherWidgets, defaultLocation } from "./components/Controller";

loadSearchBar();
loadWeatherWidgets(defaultLocation);