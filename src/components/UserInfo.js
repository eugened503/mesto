export default class UserInfo {
  constructor({ title, subtitle }, api) {
    this._nameSelector = document.querySelector(title);
    this._jobSelector = document.querySelector(subtitle);
    this._infoApi = api;
  }

  getUserInfo() { // возращает объект с данными пользователя
    return {
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent
    }
  }
  
  setUserInfo(data) { // принимает новые данные пользователя и добавляет их на страницу
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent =  data.about;
    this._infoApi.sendUserInfo('/users/me', data); //отправляет новые данные пользователя на сервер
  }


}
