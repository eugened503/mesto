import Popup from '../components/Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.clickCloseBtn = this._hanldeSubmitForm.bind(this);
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', this.clickCloseBtn);
  }

  _getInputValues() { //создаем массив из инпутов
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues;
  }

  close() { //метод закрытия поп-апа
    super.close();
    // this._popupSelector.firstElementChild.reset();
    // this._popupSelector.querySelector('.popup__container').reset();
    this._popupSelector.removeEventListener('submit', this.clickCloseBtn);
  }

  _hanldeSubmitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();

  }
}