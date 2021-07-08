import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMsg = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _succMsg = '';
  _delBtn = true;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false, this._delBtn))
      .join('');
  }
  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', function (evt) {
      const btn = evt.target.closest('.delBtn');
      if (!btn) return;
      handler();
    });
  }
}

export default new BookmarksView();
