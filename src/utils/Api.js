export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me`, {
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  editUserInfo({ name, about }) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
        "Content-Type": "application/JSON",
      },

      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  addNewPhoto({ name, link }) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards`, {
      method: "POST",
      headers: {
        authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
        "Content-Type": "application/JSON",
      },

      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

//   test() {
//     fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//       headers: {
//         authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//       });
//   }
// }
