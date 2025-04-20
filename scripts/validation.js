const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__imput_type_error");
}

const hideInputError = (formEl, inputEl) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__imput_type_error");
}

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
}

const setEventListener = (formEl) => {
  const inputList = Array.form(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__close-btn");

  //TODO - handle initial states- will handle later
  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      //toggleButtonState(iinputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = (document.querySelectorAll(".modal__form"));
  formList.forEach((formEl)=>{
    setEventListener(formEl);
  }
}

enableValidation();