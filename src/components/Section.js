export default class Section { 
  constructor( {renderer}, containerSelector) {
    this._renderer = renderer; //функция создает и отрисовывает карточки на странице
    this._containerSelector = document.querySelector(containerSelector);
  }

  drawingArray(array) {
    array.reverse();
    array.forEach(item => this._renderer(item));
  }

  addItem(element) {
       this._containerSelector.prepend(element);
  }

}

