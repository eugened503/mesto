export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.myButton = this._popupSelector.querySelector('.popup__close-button'); //получаем кнопку поп-апа
    this.clickListenerBind = this.close.bind(this);
  }

  open() {
    this._setEventListeners(); // добавляем слушатель для закрытия поп-апа
    this._popupSelector.classList.add('popup_opened');

  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); //удаляем слушатель для esc
    document.removeEventListener('click', this.overlay); //удаляем слушатель для оверлэя    
    this.myButton.removeEventListener("click", this.clickListenerBind); // удаляем слушатель кнопки закрытия

  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  overlay = (e) => {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  _setEventListeners() {
    this.myButton.addEventListener("click", this.clickListenerBind); // добавляем слушатель кнопки закрытия
    document.addEventListener('keydown', this._handleEscClose); // добавляем слушатель для esc
    document.addEventListener('click', this.overlay); // добавляем слушатель для оверлэя    
  }

}
