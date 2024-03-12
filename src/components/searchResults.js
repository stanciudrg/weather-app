import customFetch from "./customFetch";

// Fetches the search JSON file for a specified parameter
// using the customFetch function
const fetchSearchResults = async (parameters) => {
    const url = `https://api.weatherapi.com/v1/search.json?key=bd957ce5f33f49e692b105538240603&q=${parameters}`;
    const searchResults = await customFetch(url);
    return searchResults;
  };