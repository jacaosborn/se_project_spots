// edit profile variables
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
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

// edit profile listeners
editProfileButton.addEventListener("click", function (event) {
  editProfileModal.classList.add("modal_is-opened");
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
});

editProfileCloseButton.addEventListener("click", function (event) {
  editProfileModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUserName.textContent = profileNameInput.value;
  profileUserDescription.textContent = profileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

// new post variables
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostSaveButton = newPostModal.querySelector(".modal__submit-button");
const newPostImageInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#image-caption-input");

// new post listeners
newPostButton.addEventListener("click", function (event) {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function (event) {
  newPostModal.classList.remove("modal_is-opened");
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostModal.addEventListener("submit", handleAddCardSubmit);
