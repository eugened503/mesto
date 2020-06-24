export default class UserInfo {
  constructor({ title, subtitle }) {
    this._nameSelector = document.querySelector(title);
    this._jobSelector = document.querySelector(subtitle);
  }
  getUserInfo() { // возращает объект с данными пользователя
    return {
      name: this._nameSelector.textContent,
      work: this._jobSelector.textContent
    }
  }
  setUserInfo(name, work) { // принимает новые данные пользователя и добавляет их на страницу
    this._nameSelector.textContent = name;
    this._jobSelector.textContent =  work;
  }
}
