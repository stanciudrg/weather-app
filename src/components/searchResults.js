import customFetch from "./customFetch";

// Fetches the search JSON file for a specified parameter
// using the customFetch function
export const fetchSearchResults = async (parameters) => {
  const url = `https://api.weatherapi.com/v1/search.json?key=bd957ce5f33f49e692b105538240603&q=${parameters}`;
  const searchResults = await customFetch(url);
  return searchResults;
};

// Fetches the searchResults array and returns a new array of objects that contain only the data
// needed for this app
export const getSearchResults = async (parameters) => {
  const searchResults = await fetchSearchResults(parameters);
  const simplifiedSearchResults = [];

  searchResults.forEach((result) => {
    const customSearchResult = {
      id: result.id,
      name: result.name,
      country: result.country,
    };

    simplifiedSearchResults.push(customSearchResult);
  });

  return simplifiedSearchResults;
};