export default class UserInfo {
  constructor(name, info) {
    this.name = name;
    this.info = info;
  }

  getUserInfo() { //возвращает объект с данными пользователя
    const cardElement = document
      .querySelector('.profile-info')
      .querySelector('.information')
    this._element = cardElement;
    return cardElement; // вернём DOM-элемент профиля;
  }

  setUserInfo() { // принимает новые данные пользователя и добавляет их на страницу
    this.getUserInfo();
    this._element.querySelector('.profile-info__title').textContent = this.name;
    this._element.querySelector('.profile-info__subtitle').textContent = this.info;
    return this._element;
  }
}