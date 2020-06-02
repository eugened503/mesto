 export const popupEnlargement = document.querySelector('.popup-enlargement'); //поп-ап просмотра карточки (увеличенный вид)
 import {openPopups} from './utils.js'
 export default class  Card {
    constructor(name, link) {
        this._name=name;
        this._link=link;
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
        const titleEnlargement =  document.querySelector('.popup__title-enlargement');
        document.querySelector('.popup__img-enlargement').src = this._link;  //добавляем адрес картинки 
        titleEnlargement.alt = this._name;
        titleEnlargement.textContent = this._name; //добавляем название картинки 
        openPopups(popupEnlargement);
      }

    _toggleLike() { // метод удаления/добавления лайка
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
      }

    _deleteCard() { // метод удаления карточки
        this._element.remove();
      }

     _setEventListeners() { // добавляем слушатели для карточки
        this._element.querySelector('.card__image').addEventListener('click', () => {
          this._handleOpenPopup();
        });
        this._element.querySelector('.card__like-button').addEventListener('click', () => {
          this._toggleLike();
           });
        this._element.querySelector('.card__trash-button').addEventListener('click', () => {
          this._deleteCard();
           });
      }
  }

