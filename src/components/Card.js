export default class Card {
  constructor(item, name, link, { handleCardClick, handleDeleteCard }, api) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this.handleListenerBind = this._handleCardClick.bind(this);
    this.ListenerToggleLike = this._toggleLike.bind(this);
    this.ListenerHandleDeleteCard = this._deleteCard.bind(this);
    this._apiSum = api;
    this._item = item;
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
    this._mylike();
    this._hiddenTrashButton();
    // Добавим данные
    const image = this._element.querySelector('.card__image');
    const title = this._element.querySelector('.card__title');
    this._element.querySelector('.card__like-sum').textContent = this._item.likes.length; //добавляем цифру, указывающую на кол-во лайков
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

  _mylike() { //добавляем на страницу мой лайк 
    this._item.likes.some((item) => {
      if (item._id === '1f947081c23d529c02dbdf0f') {
        this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
      }
    })
  }

  _toggleLike() { //изменяем цвет лайка по клику и изменяем цифру, указывающую на кол-во лайков

    const likeButton = this._element.querySelector('.card__like-button');

    if (!(this._element.querySelector('.card__like-button').classList.contains('card__like-button_active'))) {
      this._apiSum.sendLike(`/cards/likes/${this._item._id}`)
        .then((data) => {
          likeButton.classList.add('card__like-button_active');
          this._element.querySelector('.card__like-sum').textContent = data.likes.length;
        })
    } else {
      this._apiSum.deleteCard(`/cards/likes/${this._item._id}`)
        .then((data) => {
          likeButton.classList.toggle('card__like-button_active');
          this._element.querySelector('.card__like-sum').textContent = data.likes.length;
        })
    }
  }

  _deleteCard() { // удаляем карточки
    this._handleDeleteCard(this._element);
  }

  _hiddenTrashButton() { //скрываем иконки удаления других пользователей
    if (!(this._item.owner._id === '1f947081c23d529c02dbdf0f')) {
      this._element.querySelector('.card__trash-button').style.display = 'none';
    }
  }

  _setEventListeners() { // добавляем слушатели для карточки
    this._element.querySelector('.card__image').addEventListener("click", this.handleListenerBind);
    this._element.querySelector('.card__like-button').addEventListener('click', this.ListenerToggleLike);
    this._element.querySelector('.card__trash-button').addEventListener('click', this.ListenerHandleDeleteCard);
  }

  removeEventListeners() { //удаляем все слушатели
    this._element.querySelector('.card__image').removeEventListener("click", this.handleListenerBind);
    this._element.querySelector('.card__like-button').removeEventListener('click', this.ListenerToggleLike);
    this._element.querySelector('.card__trash-button').removeEventListener('click', this.ListenerHandleDeleteCard);
  }
}

