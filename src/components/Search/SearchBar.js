import "./SearchBar.css";
import searchIcon from "../../inline-svg/search.svg";
import clearIcon from "../../inline-svg/clear.svg";
import SearchResults from "./SearchResults";

export default class SearchBar {
  constructor(DOMLocation, callback) {
    this.container = document.createElement("div");
    this.searchInput = document.createElement("input");
    this.clearButton = document.createElement("button");
    this.DOMLocation = DOMLocation;
    this.searchResults = "";
    this.callback = callback;
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
    const debounceSearchAction = SearchBar.debounce(this.getSearchResults, 500);
    this.searchInput.addEventListener("focus", debounceSearchAction);
    this.searchInput.addEventListener("input", debounceSearchAction);
    this.searchInput.addEventListener("input", this.toggleClearButton);
    this.searchInput.addEventListener("blur", this.removeSearchResults);
    inputWrapper.appendChild(this.searchInput);

    this.clearButton.classList.add("search_clear-button");
    this.clearButton.innerHTML = clearIcon;
    this.clearButton.addEventListener("click", this.clearSearchBar);
    this.clearButton
      .querySelector("svg")
      .classList.add("search_clear-button-icon");
    inputWrapper.appendChild(this.clearButton);
  }

  removeSearchResults = () => {
    if (this.searchResults) this.searchResults.destroy();
  };

  getSearchResults = (e) => {
    if (this.searchResults) this.searchResults.destroy();
    if (e.target.value.length === 0) return;
    if (document.activeElement !== e.target) return;
    this.searchResults = new SearchResults(e.target.value, this.callback);
    this.searchResults.init();
  };

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
    this.searchInput.dispatchEvent(new Event("input"));
    this.focusSearchBar();
    this.toggleClearButton();
  };
}
