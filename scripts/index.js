// card variables/functions
const cardTemplate = document.querySelector("#gallery__card-template");
const gallery = document.querySelector(".gallery");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".gallery__content")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".gallery__photo-name");
  const cardImg = cardElement.querySelector(".gallery__photo");
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardTitle.textContent = data.name;

  const profileForm = document.forms["profile-form"];
  const postForm = document.forms["post-form"];

  //like button variable and listener
  const likeButton = cardElement.querySelector(".gallery__like-icon");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("gallery__like-icon_liked");
  });

  //delete button variable and listener
  const deleteButton = cardElement.querySelector(".gallery__delete-icon");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
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

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);

  gallery.prepend(cardElement);
});

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
const profileUserName = document.querySelector(".profile__user-name");
const profileUserDescription = document.querySelector(
  ".profile__user-description"
);
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// edit profile listeners and function
editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  disableButton(profileModalSaveButton, validationSettings);
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = profileNameInput.value;
  profileUserDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
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
  disableButton(newPostSaveButton, validationSettings);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  const newCard = {
    name: newPostCaptionInput.value,
    link: newPostImageInput.value,
  };
  evt.preventDefault();

  closeModal(newPostModal);
  evt.target.reset();

  const cardElement = getCardElement(newCard);

  gallery.prepend(cardElement);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

expandCloseBtn.addEventListener("click", function () {
  closeModal(expandModal);
});
