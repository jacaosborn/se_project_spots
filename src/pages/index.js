import {
  enableValidation,
  disableButton,
  resetValidation,
  validationSettings,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
let selectedCard;
let selectedCardId;
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(
  ".profile__user-description"
);
const userAvatar = document.querySelector(".profile__photo");
const deleteConfirmationModal = document.querySelector("#photo-delete-modal");
const deleteConfirmationCloseButton = deleteConfirmationModal.querySelector(
  ".modal__image-delete-close-button"
);
const deleteConfirmationCancelButton = deleteConfirmationModal.querySelector(
  ".modal__cancel-image-delete-button"
);
const deleteConfirmationSubmitButton = document.querySelector(
  ".modal__image-delete-button"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "88f5c885-c80c-45a1-8fab-3e371eeed876",
    "Content-Type": "application/json",
  },
});
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      const cardElement = getCardElement(card);

      gallery.prepend(cardElement);
    });
    profileUserName.textContent = userInfo.name;
    profileUserDescription.textContent = userInfo.about;

    userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
  })
  .catch(console.error);

// initialCards.forEach(function (card) {
//   const cardElement = getCardElement(card);

//   gallery.prepend(cardElement);
// });

// card variables/functions
const cardTemplate = document.querySelector("#gallery__card-template");
const gallery = document.querySelector(".gallery");

function handleDeleteSubmit(cardElement, cardId) {
  deleteConfirmationSubmitButton.textContent = "Deleting...";
  api
    .removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .then(closeModal(deleteConfirmationModal))
    .catch(console.error)
    .finally(() => {
      deleteConfirmationSubmitButton.textContent = "Delete";
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteConfirmationModal);
  deleteConfirmationCloseButton.addEventListener("click", function () {
    closeModal(deleteConfirmationModal);
  });
  deleteConfirmationCancelButton.addEventListener("click", function () {
    closeModal(deleteConfirmationModal);
  });
  deleteConfirmationSubmitButton.addEventListener("click", function () {
    handleDeleteSubmit(selectedCard, selectedCardId);
  });
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".gallery__content")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".gallery__like-icon");
  const cardTitle = cardElement.querySelector(".gallery__photo-name");
  const cardImg = cardElement.querySelector(".gallery__photo");
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardTitle.textContent = data.name;
  if (data.isLiked) {
    likeButton.classList.add("gallery__like-icon_liked");
  }

  const profileForm = document.forms["profile-form"];
  const postForm = document.forms["post-form"];

  //like button variable and listener

  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("gallery__like-icon_liked")) {
      api
        .removeLike(data._id)
        .then((res) => console.log(res))
        .then(likeButton.classList.toggle("gallery__like-icon_liked"))
        .catch(console.error);
    } else {
      api
        .addLike(data._id)
        .then((res) => console.log(res))
        .then(likeButton.classList.toggle("gallery__like-icon_liked"))
        .catch(console.error);
    }
  });

  //delete button variable and listener
  const deleteButton = cardElement.querySelector(".gallery__delete-icon");
  deleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement, data._id);
  });

  //expand image modal listener
  cardImg.addEventListener("click", function () {
    expandPhoto.src = data.link;
    expandPhoto.alt = data.name;
    expandName.textContent = data.name;
    openModal(expandModal);
  });

  return cardElement;
}

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

// initialCards.forEach(function (card) {
//   const cardElement = getCardElement(card);

//   gallery.prepend(cardElement);
// });

function escapeKeyHandler(modalToClose) {
  return function (evt) {
    if (evt.key === "Escape") {
      closeModal(modalToClose);
    }
  };
}

function clickOffHandler(modalToClose) {
  return function (evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(modalToClose);
    }
  };
}

// functions (general)
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.keyDownHandler = escapeKeyHandler(modal);
  window.addEventListener("keydown", modal.keyDownHandler);
  modal.clickToCloseHandler = clickOffHandler(modal);
  modal.addEventListener("mousedown", modal.clickToCloseHandler);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  window.removeEventListener("keydown", modal.keyDownHandler);
  modal.removeEventListener("mousedown", modal.clickOffHandler);
}

// edit profile variables
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileModalSaveButton = editProfileModal.querySelector(
  ".modal__submit-button"
);

const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editAvatarButton = document.querySelector(".profile__photo");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");
const editAvatarCloseButton = editAvatarModal.querySelector(
  ".modal__close-button"
);
const editAvatarSubmitButton = editAvatarForm.querySelector(
  ".modal__submit-button"
);

// edit profile listeners and function
editAvatarButton.addEventListener("click", function () {
  openModal(editAvatarModal);

  resetValidation(editAvatarModal, [editAvatarInput], validationSettings);
});

editAvatarCloseButton.addEventListener("click", function () {
  closeModal(editAvatarModal);
});
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .editAvatar(editAvatarInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
  closeModal(editAvatarModal);
  disableButton(editAvatarSubmitButton, validationSettings);
}

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
  resetValidation(
    editProfileModal,
    [profileNameInput, profileDescriptionInput],
    validationSettings
  );
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileUserName.textContent = data.name;
      profileUserDescription.textContent = data.about;
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });

  closeModal(editProfileModal);
  disableButton(profileModalSaveButton, validationSettings);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// new post variables
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostSaveButton = newPostModal.querySelector(".modal__submit-button");
const newPostImageInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#image-caption-input");

const expandModal = document.querySelector("#photo-expand-modal");
const expandCloseBtn = expandModal.querySelector(
  ".modal__close-button_type_expanded"
);
const expandPhoto = expandModal.querySelector(".modal__photo-expanded");
const expandName = expandModal.querySelector(".modal__expand-caption");

// new post listeners
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .addNewPhoto({
      name: newPostCaptionInput.value,
      link: newPostImageInput.value,
    })
    .then((newCard) => {
      gallery.prepend(getCardElement(newCard));
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });

  closeModal(newPostModal);
  evt.target.reset();
  disableButton(newPostSaveButton, validationSettings);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

expandCloseBtn.addEventListener("click", function () {
  closeModal(expandModal);
});
