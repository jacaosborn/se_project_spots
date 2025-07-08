// edit profile stuff
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

editProfileButton.addEventListener("click", function (event) {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function (event) {
  editProfileModal.classList.remove("modal_is-opened");
});

// new post stuff
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

newPostButton.addEventListener("click", function (event) {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function (event) {
  newPostModal.classList.remove("modal_is-opened");
});
