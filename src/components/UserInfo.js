export default class UserInfo {
  constructor({ title, subtitle }, author, job) {
    this._nameSelector = document.querySelector(title);
    this._jobSelector = document.querySelector(subtitle);
    this._author = author;
    this._job = job;  
  }
  getUserInfo() { // возращает объект с данными пользователя
    this._author.value = this._nameSelector.textContent;
    this._job.value = this._jobSelector.textContent;
    return {
      name: this._author.value,
      work: this._job.value
    }
  }
  setUserInfo(name, work) { // принимает новые данные пользователя и добавляет их на страницу
    this._nameSelector.textContent = name;
    this._jobSelector.textContent =  work;
  }
}
