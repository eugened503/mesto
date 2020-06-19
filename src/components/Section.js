export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items; //массив данных, которые нужно добавить на страницу 
      this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
      this._container = document.querySelector(containerSelector);
    }
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item))
    }
    addItem(element) { // принимает DOM-элемент и добавляет его в контейнер
      this._container.prepend(element);
    }

  }