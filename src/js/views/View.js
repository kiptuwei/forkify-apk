import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  constructor(){
    console.log(this)
  }
  /**
   * Render received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (E.g recipe)
   * @param {Boolean} [render=true] If false create markup string
   * @param {*} delBtn
   * @returns {undefined | string} if render = false it returns a string
   * @this {Object} View instance
   * @author 10ei
   */

  render(data, render = true, delBtn) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this.generateMarkup(delBtn);

    if (!render) return markup;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //console.log(newDOM);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //UPDATES CHANGED TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log('😎', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //UPDATES CHANGED ATTRIBUTES
      //console.log(Array.from(newEl.attributes));
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpiner() {
    const markup = `
        <div class="spinner">
          <svg>
           <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errMsg) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._succMsg) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
