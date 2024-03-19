import "./SearchBar.css";
import searchIcon from "../../inline-svg/search.svg";
import clearIcon from "../../inline-svg/clear.svg";
import SearchResults from "./SearchResults";

export default class SearchBar {
  constructor(DOMLocation, callback) {
    this.container = document.createElement("div");
    this.inputWrapper = document.createElement("div");
    this.inputWrapper.innerHTML = searchIcon;
    this.searchIcon = this.inputWrapper.querySelector('svg');
    this.searchInput = document.createElement("input");
    this.clearButton = document.createElement("button");
    this.DOMLocation = DOMLocation;
    this.searchResults = "";
    this.callback = callback;
    this.debounceSearchAction = SearchBar.debounce(this.getSearchResults, 500);
  }

  init() {
    this.container.id = "searchbar";
    this.DOMLocation.appendChild(this.container);

    const label = document.createElement("label");
    label.setAttribute("for", "search");
    this.container.appendChild(label);

    this.inputWrapper.classList.add("search_input-wrapper");
    this.container.appendChild(this.inputWrapper);

    this.searchIcon.classList.add("search_input-icon");
    this.searchIcon.addEventListener("click", this.focusSearchBar);

    this.searchInput.id = "search";
    this.searchInput.setAttribute("type", "search");
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

  destroy() {
    this.searchIcon.removeEventListener("click", this.focusSearchBar);
    this.searchInput.removeEventListener("focus", this.debounceSearchAction);
    this.searchInput.removeEventListener("input", this.debounceSearchAction);
    this.searchInput.removeEventListener("input", this.toggleClearButton);
    this.searchInput.removeEventListener("blur", this.removeSearchResults);
    this.clearButton.removeEventListener("click", this.clearSearchBar);
    this.container.remove();
  }
}