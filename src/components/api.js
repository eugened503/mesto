export default class API {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  
  _fetch(url, params) {
    params.headers = {
      authorization: 'b6efac6e-fe72-4acc-8171-d974e56a542c',
      'Content-Type': 'application/json'
    };
    return fetch(this._baseUrl + url, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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


