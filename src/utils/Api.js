export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  // ATTENTION CODE CHECKER:
  // need assistance on this. When I change the url in the fetch to
  // `${this._baseUrl}cards`, it breaks. I can't figure out how to fix it
  // same thing happens with all other fetches. Something wrong with the api
  // construction on index.js I assume, but I don't know what.
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me`, {
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
      },
    }).then(this._checkResponse);
  }
  editUserInfo({ name, about }) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
        "Content-Type": "application/JSON",
      },

      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }
  addNewPhoto({ name, link }) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards`, {
      method: "POST",
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
        "Content-Type": "application/JSON",
      },

      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
        },
      }
    ).then(this._checkResponse);
  }
  addLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
          "Content-Type": "application/JSON",
        },
      }
    ).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
          "Content-Type": "application/JSON",
        },
      }
    ).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ avatar }),
      }
    ).then(this._checkResponse);
  }
}
