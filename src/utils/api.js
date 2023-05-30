class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers
  }

  _check_response(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Response retruns with ${res.status} status code`)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._check_response)
  }

  upgradeUserData(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(this._check_response)
  }

  upgradeUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.link
      })
    })
      .then(this._check_response)
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._check_response)
  }

  addNewCardToServer(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(this._check_response)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._check_response)
  }

  changeLikeCard(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this._check_response)
  }


}

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "bf09fd5b-3c45-4e70-9b69-806c8df2b150",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);
export default api;
