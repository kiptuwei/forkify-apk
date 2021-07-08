import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (evt) {
      const btn = evt.target.closest('.btn--inline');
      if (!btn) return;
      //console.log(btn);
      const gotoPage = +btn.dataset.goto;
      //console.log(gotoPage);
      handler(gotoPage);
    });
  }

  generateMarkup() {
    //console.log(this._data);
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // console.log(this._curPage);
    //1)Page 1 and  other pages
    if (this._curPage === 1 && numPages > 1) return this.nextBtn();
    //3)Last page
    if (this._curPage === numPages && numPages > 1) return this.prevBtn();
    //4)Other page
    if (this._curPage < numPages) return this.prevBtn() + this.nextBtn();

    //2)Page 1 and no other pages
    return '';
  }
  prevBtn() {
    return `
        <button data-goto = "${
          this._curPage - 1
        }"  class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>Page ${this._curPage - 1}</span>
        </button>
         `;
  }
  nextBtn() {
    return `
        <button data-goto = "${
          this._curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }
}

export default new PaginationView();

///ggygyg
///ggygyg
