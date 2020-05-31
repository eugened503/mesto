import openAllPopups from './index.js';
import {popupEnlargement} from './index.js'
const initialCards = [
    {
        name: 'Магадан',
        link: 'https://images.unsplash.com/photo-1570340831042-040b3999690c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80'
    },
    {
        name: 'Екатеринбург',
        link: 'https://images.unsplash.com/photo-1521398650514-170f902bb376?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Вологодская область',
        link: 'https://images.unsplash.com/photo-1568231582302-582041bd3a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80'
    },
    {
        name: 'Новосибирск',
        link: 'https://images.unsplash.com/photo-1530966449884-b130ce445fb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Хакасия',
        link: 'https://images.unsplash.com/photo-1587730730093-0405a91c5436?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Владивосток',
        link: 'https://images.unsplash.com/photo-1557023082-34ecc3b974b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
    }
];

export class Card {
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
        document.querySelector('.popup__img-enlargement').src = this._link;  //добавляем адрес картинки 
        document.querySelector('.popup__title-enlargement').alt = this._name;
        document.querySelector('.popup__title-enlargement').textContent = this._name; //добавляем название картинки 
        openAllPopups(popupEnlargement);
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

  initialCards.forEach((item) => { // переберём весь исходный массив
    const card = new Card(item.name, item.link); // создадим экземпляр карточки для каждого элемента
    document.querySelector('.cards').prepend(card.generateCard());
  });
