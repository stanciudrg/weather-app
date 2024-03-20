import WeatherWidget from "../WeatherWidget";
import customFetch from "../helpers/customFetch";
import "./SearchResults.css";

export default class SearchResults extends WeatherWidget {
  constructor(parameters, callback) {
    super();
    // Parameter used to fetch search results
    this.parameters = parameters;
    this.callback = callback;
  }

  // Calls super to initialize loading animation then fills super's container
  // with the result of the Promise
  async init() {
    super.init();
    this.container.classList.add("search-results");
    this.insertInto(document.querySelector(".searchbar_wrapper"));

    try {
      const searchResults = await this.fetchData();
      const simplifiedSearchResults =
        SearchResults.simplifyFetchedData(searchResults);
      this.setData(simplifiedSearchResults);
      this.displayData();
    } catch (error) {
      this.setError(error);
      this.displayError();
    }
  }

  // Replaces the loading animation started by super with the DOM content
  // that holds the fetched data of SearchResults
  displayData() {
    this.loadingAnimation.remove();

    if (this.data.length === 0) {
      const h3 = document.createElement("h3");
      h3.classList.add("search-results_none");
      h3.textContent = `No results found for "${this.parameters}"`;
      this.container.appendChild(h3);
      return;
    }

    const resultsList = document.createElement("ul");
    resultsList.classList.add("search-results_list");
    this.container.appendChild(resultsList);

    this.data.forEach((result) => {
      const li = document.createElement("li");
      li.classList.add("search-results_result");
      li.dataset.id = result.id;
      li.textContent = `${result.name}, ${result.country}`;
      li.addEventListener("mousedown", this.requestWeatherWidgets);
      resultsList.appendChild(li);
    });
  }

  // Replaces the loading animation started by super with the DOM content
  // that holds the error name and error details of the fetch operation
  displayError() {
    this.loadingAnimation.remove();

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("search-results_error");
    this.container.appendChild(errorMessage);

    const errorTitle = document.createElement("h2");
    errorTitle.classList.add("search-results_error-title");
    errorTitle.textContent = "Unable to retrieve search results";
    errorMessage.appendChild(errorTitle);

    const errorValue = document.createElement("p");
    errorValue.classList.add("search-results_error-value");
    errorValue.textContent = this.error;
    errorMessage.appendChild(errorValue);
  }

  // Calls Controller's loadWeatherWidgets callback function with the 
  // dataset.id value of the clicked li item
  requestWeatherWidgets = (e) => {
    this.callback(e.target.dataset.id);
  };

  // Fetches the search JSON file for the specified parameters using the
  // customFetch function
  async fetchData() {
    if (!this.parameters) throw new Error("Search parameters not provided");
    const url = `https://api.weatherapi.com/v1/search.json?key=bd957ce5f33f49e692b105538240603&q=${this.parameters}`;
    const searchResults = await customFetch(url);

    return searchResults;
  }

  // Returns an object containing the needed target properties only
  static simplifyFetchedData(target) {
    const simplifiedSearchResults = [];

    target.forEach((result) => {
      const customSearchResult = {
        id: result.id,
        name: result.name,
        country: result.country,
      };
      simplifiedSearchResults.push(customSearchResult);
    });

    return simplifiedSearchResults;
  }

  // Detaches event listeners and removes super's this.container from the DOM;
  destroy() {
    const results = this.container.querySelectorAll("li");

    results.forEach((result) => {
      result.removeEventListener("mousedown", this.requestWeatherWidgets);
    });

    super.destroy();
  }
}
