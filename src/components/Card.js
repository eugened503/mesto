
export default class Card {
  constructor(name, link, {handleCardClick}) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this.handleListenerBind = this._handleCardClick.bind(this);
    this.ListenerDeleteCard = this._deleteCard.bind(this);
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
    const image = this._element.querySelector('.card__image');
    const title = this._element.querySelector('.card__title');

    image.src = this._link;
    title.textContent = this._name;
    title.alt = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  _handleCardClick(link, name) {
    this._name = name;
    this._link = link;
  };

  _toggleLike(evt) { //измененеи цвета лайка по клику
    evt.target.classList.toggle('card__like-button_active');
  };

  _deleteCard() { // метод удаления карточки
    this._element.remove();
    this._removeEventListeners(); //удаляем все слушатели
  }

  _setEventListeners() { // добавляем слушатели для карточки
    this._element.querySelector('.card__image').addEventListener("click", this.handleListenerBind); 
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLike);
    this._element.querySelector('.card__trash-button').addEventListener('click', this.ListenerDeleteCard);
  }

  _removeEventListeners(){
    this._element.querySelector('.card__image').removeEventListener("click", this.handleListenerBind); 
    this._element.querySelector('.card__like-button').removeEventListener('click', this._toggleLike);
    this._element.querySelector('.card__trash-button').removeEventListener('click', this.ListenerDeleteCard);
  }
}

