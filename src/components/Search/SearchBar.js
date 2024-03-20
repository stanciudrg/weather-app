import "./SearchBar.css";
import searchIcon from "../../inline-svg/search.svg";
import clearIcon from "../../inline-svg/clear.svg";
import SearchResults from "./SearchResults";

export default class SearchBar {
  constructor(DOMLocation, callback) {
    this.container = document.createElement("div");
    this.inputWrapper = document.createElement("div");
    this.inputWrapper.innerHTML = searchIcon;
    this.searchIcon = this.inputWrapper.querySelector("svg");
    this.searchInput = document.createElement("input");
    this.clearButton = document.createElement("button");
    // The DOM element that is supposed to hold this DOM instance of SearchBar
    this.DOMLocation = DOMLocation;
    // Property that will hold the "new SearchResults()"" object
    this.searchResults = "";
    // Callback function that will be further passed to SearchResults. Points
    // back to the Controller's loadWeatherWidgets function, and will be used
    // to ask the Controller to load new weather widgets whenever the user
    // selects a location from the results list of the searchbar
    this.callback = callback;
    // Debouncer that limits the number of API calls made when the user types
    // into the searchbar by waiting 500ms before submitting a request
    this.debounceSearchAction = SearchBar.debounce(this.getSearchResults, 500);
  }

  // Creates the DOM content of the searchbar and adds event listeners
  init() {
    this.container.id = "searchbar";
    this.DOMLocation.appendChild(this.container);

    const searchBarWrapper = document.createElement('div');
    searchBarWrapper.classList.add('searchbar_wrapper');
    this.container.appendChild(searchBarWrapper);

    const label = document.createElement("label");
    label.setAttribute("for", "search");
    searchBarWrapper.appendChild(label);

    this.inputWrapper.classList.add("search_input-wrapper");
    searchBarWrapper.appendChild(this.inputWrapper);

    this.searchIcon.classList.add("search_input-icon");
    this.searchIcon.addEventListener("click", this.focusSearchBar);

    this.searchInput.id = "search";
    this.searchInput.setAttribute("type", "search");
    this.searchInput.setAttribute("autocomplete", "off");
    this.searchInput.setAttribute("placeholder", 'Search for a city')
    this.searchInput.addEventListener("focus", this.debounceSearchAction);
    this.searchInput.addEventListener("input", this.debounceSearchAction);
    this.searchInput.addEventListener("input", this.toggleClearButton);
    this.searchInput.addEventListener("blur", this.removeSearchResults);
    this.inputWrapper.appendChild(this.searchInput);

    this.clearButton.classList.add("search_clear-button");
    this.clearButton.innerHTML = clearIcon;
    this.clearButton.addEventListener("click", this.clearSearchBar);
    this.clearButton
      .querySelector("svg")
      .classList.add("search_clear-button-icon");
    this.inputWrapper.appendChild(this.clearButton);

    document.addEventListener('click', this.blurInput);
  }

  // Manually blurs the 'search' input when the user clicks outside its
  // boundaries
  blurInput = (e) => {
    if (!e.target.closest('#searchbar')) this.searchInput.blur();
  }

  // Calls the destroy method on the SearchResults class to remove its elements
  // from the DOM and detach its event listeners to prevent memory leaks
  removeSearchResults = () => {
    if (this.searchResults) this.searchResults.destroy();
  };

  // Creates a SearchResults object. Provides the value of the search input
  // as search parameters (first argument), and passes the callback
  // described in the constructor (second argument)
  getSearchResults = (e) => {
    if (this.searchResults) this.searchResults.destroy();
    if (e.target.value.length === 0) return;
    if (document.activeElement !== e.target) return;
    this.searchResults = new SearchResults(e.target.value, this.callback);
    this.searchResults.init();
  };

  // Delays the execution of the callback for the specified waitTime
  static debounce(callback, waitTime) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, waitTime);
    };
  }

  // Manually applies focus to the searchbar input
  focusSearchBar = () => {
    this.searchInput.focus();
  };

  // Toggles the visibility of the searchbar clear button
  toggleClearButton = () => {
    if (this.searchInput.value.length > 0) {
      this.clearButton.classList.add("visible");

      return;
    }

    this.clearButton.classList.remove("visible");
  };

  clearSearchBar = () => {
    this.searchInput.value = "";
    this.searchInput.dispatchEvent(new Event("input"));
    this.focusSearchBar();
    this.toggleClearButton();
  };

  // Detaches event listeners and removes this container from the DOM
  destroy() {
    this.searchIcon.removeEventListener("click", this.focusSearchBar);
    this.searchInput.removeEventListener("focus", this.debounceSearchAction);
    this.searchInput.removeEventListener("input", this.debounceSearchAction);
    this.searchInput.removeEventListener("input", this.toggleClearButton);
    this.searchInput.removeEventListener("blur", this.removeSearchResults);
    this.clearButton.removeEventListener("click", this.clearSearchBar);
    document.removeEventListener('click', this.blurInput);
    this.container.remove();
  }
}
