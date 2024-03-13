import customFetch from "./customFetch";

// Fetches the search JSON file for a specified parameter using the customFetch
// function
const fetchSearchResults = async (parameters) => {
  const url = `https://api.weatherapi.com/v1/search.json?key=bd957ce5f33f49e692b105538240603&q=${parameters}`;
  const searchResults = await customFetch(url);

  return searchResults;
};

// Fetches the searchResults array and returns a new array of  objects that
// contain only the data needed for this app
const simplifyFetchedData = (target) => {
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
};

export default class SearchResults {
  constructor(parameters) {
    this.parameters = parameters;
    this.data = {};
    this.error = "noError";
    this.container = document.createElement("div");
  }

  async init() {
    try {
      const searchResults = await fetchSearchResults(this.parameters);
      const simplifiedSearchResults = simplifyFetchedData(searchResults);
      this.setData(simplifiedSearchResults);
      this.displayData();
    } catch (error) {
      this.setError(error);
      this.displayError();
    }
  }

  setData(data) {
    this.data = data;
  }

  setError(error) {
    this.error = error;
  }

  getData() {
    return this.data;
  }

  getError() {
    return this.error;
  }

  displayData() {
    console.log(this.data);
  }

  displayError() {
    console.log(this.error);
  }

  insertInto(element) {
    element.appendChild(this.container);
  }
}
