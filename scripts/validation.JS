const profileForm = document.forms["profile-form"];
const postForm = document.forms["post-form"];
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__input-error-active",
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(validationSettings.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

const showInputError = (formEl, inputEl, validationMsg) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgId);
  errorMsgEl.textContent = validationMsg;
  inputEl.classList.add(validationSettings.inputErrorClass);
};
const hideInputError = (formEl, inputEl) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgId);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(validationSettings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
}

function setEventListeners(formElement, settings) {
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

enableValidation(validationSettings);
