import "./SearchBar.css";
import searchIcon from "../../inline-svg/search.svg";
import clearIcon from "../../inline-svg/clear.svg";
import SearchResults from "./SearchResults";

export default class SearchBar {
  constructor(DOMLocation) {
    this.container = document.createElement("div");
    this.searchInput = document.createElement("input");
    this.clearButton = document.createElement("button");
    this.DOMLocation = DOMLocation;
  }

  init() {
    this.container.id = "searchbar";
    this.DOMLocation.appendChild(this.container);

    const label = document.createElement("label");
    label.setAttribute("for", "search");
    this.container.appendChild(label);

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("search_input-wrapper");
    this.container.appendChild(inputWrapper);

    inputWrapper.innerHTML = searchIcon;
    const searchLogo = inputWrapper.querySelector("svg");
    searchLogo.classList.add("search_input-icon");
    searchLogo.addEventListener("click", this.focusSearchBar);

    this.searchInput.id = "search";
    this.searchInput.setAttribute("type", "search");
    const debounceSearchAction = SearchBar.debounce(
      SearchBar.getSearchResults,
      500,
    );
    this.searchInput.addEventListener("input", debounceSearchAction);
    this.searchInput.addEventListener("input", this.toggleClearButton);
    inputWrapper.appendChild(this.searchInput);

    this.clearButton.classList.add("search_clear-button");
    this.clearButton.innerHTML = clearIcon;
    this.clearButton.addEventListener("click", this.clearSearchBar);
    this.clearButton
      .querySelector("svg")
      .classList.add("search_clear-button-icon");
    inputWrapper.appendChild(this.clearButton);
  }

  static getSearchResults(e) {
    if (e.target.value.length > 0) {
      const searchResults = new SearchResults(e.target.value);
      searchResults.init();
    }
  }

  static debounce(callback, waitTime) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, waitTime);
    };
  }

  focusSearchBar = () => {
    this.searchInput.focus();
  };

  toggleClearButton = () => {
    if (this.searchInput.value.length > 0) {
      this.clearButton.classList.add("visible");

      return;
    }

    this.clearButton.classList.remove("visible");
  };

  clearSearchBar = () => {
    this.searchInput.value = "";
    this.focusSearchBar();
    this.toggleClearButton();
  };
}
