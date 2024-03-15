import WeatherWidget from "./WeatherWidget";
import customFetch from "./customFetch";

export default class SearchResults extends WeatherWidget {
  constructor(parameters) {
    super();
    this.parameters = parameters;
  }

  async init() {
    super.init();
    this.insertInto(document.querySelector('body'));

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

  displayData() {
    this.loadingAnimation.remove();
    console.log(this.data);
  }

  displayError() {
    this.loadingAnimation.remove();
    console.log(this.error);
  }

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
}