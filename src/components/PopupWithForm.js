import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSelector, handleFormSubmit }) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleFormSubmit = handleFormSubmit;
  }

  close() { //метод закрытия поп-апа
    this._popupSelector.classList.remove('popup_opened');
  }

  _getTemplate() { // получаем содержимое поп-апа
    const formElement = document
      .querySelector(this._formSelector)
      .querySelector('.popup__container')
    return formElement;
  }

  _setEventListeners() { //добавляем слушатели для сабмита
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  _getInputValues() { //создаем массив из инпутов
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues;
  }

  generateForm() { // генерируем поп-ап
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}
