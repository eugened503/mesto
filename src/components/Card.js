import PopupWithImage from '../components/PopupWithImage.js';
import { popupEnlargement } from '../utils/constants.js';
import { imgEnlargement } from '../utils/constants.js';
import { titleEnlargement } from '../utils/constants.js';

export default class Card {
  constructor(name, link, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {  // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector('#card')
      .content
      .querySelector('.card')
      .cloneNode(true);
    this._element = cardElement;
    return cardElement; // вернём DOM-элемент карточки
  }

  generateCard() { //добавим разметку
    this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  _handleOpenPopup() { // зум-режим
    const handleOpen = new PopupWithImage(popupEnlargement, imgEnlargement, titleEnlargement);
    handleOpen.open(this._link, this._name);
  }

  _toggleLike() { // метод удаления/добавления лайка
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _deleteCard() { // метод удаления карточки
    this._element.remove();
  }

  _setEventListeners() { // добавляем слушатели для карточки

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });
  }
}

