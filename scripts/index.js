let initialCards = [
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

// functions (general)
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
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

// new post listeners
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);
  closeModal(newPostModal);
  newPostImageInput.value = "";
  newPostCaptionInput.value = "";
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});
