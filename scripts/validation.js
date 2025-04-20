const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgId = inputEl.id + "-error";
}

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
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