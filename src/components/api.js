export default class Api {
  constructor({ baseUrl, authorization}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }
  
  _fetch(url, params) {
    params.headers = {
      authorization: this._authorization,
      'Content-Type': 'application/json'
    };
    return fetch(this._baseUrl + url, params)
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
  }

  //метод получения карточки с сервера
  getInitialCards(url) {
    return this._fetch(url, {
      method: 'GET'
    })
  }

  //метод получения имени и рода деятельности пользователя с сервера
  getUserInfoServer(url) {
    return this._fetch(url, {
      method: 'GET'
    })
  }

  //метод отправления информации о пользователе на сервер и ее обновление
  sendUserInfo(url, data) {
    return this._fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
  }

  //метод отправления карточки на сервер
  sendCard(url, data) {
    return this._fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: `${data.title}`,
        link: `${data.link}`
      })
    })
  }

  //метод удаления карточки с сервера
  deleteCard(url) {
    return this._fetch(url, {
      method: 'DELETE'
    })
  }

  //метод отправления лайка
  sendLike(url) {
    return this._fetch(url, {
      method: 'PUT'
    })
  }

  ///метод изменения аватара
  changeAvatar(url, data) {
    return this._fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
  }

}


