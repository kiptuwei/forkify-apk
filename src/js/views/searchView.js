class SearchView {
  _parentElement = document.querySelector('.search');
  _searchField = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
   // if (!query) this._searchField.focus();
    return query;
  }

  _clearInput() {
    this._searchField.value = '';
    this._searchField.blur();
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', evt => {
      evt.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
