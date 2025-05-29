// Initial Cards Data
const initialCards = [
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

// Profile Edit Modal Elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editFormElement = document.forms["edit-profile"];
const editModalNameInput = document.querySelector("#profile-name-input");
const editModalDescriptionInput = document.querySelector("#profile-description-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Add Card Modal Elements
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.querySelector("#add-card-form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = document.querySelector("#add-card-name-input");
const cardLinkInput = document.querySelector("#add-card-link-input");

// Card Template and List
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Image Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn_type_preview");

// Modal Functions
function openModal(modal) {
  modal.classList.add("modal__is-open");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("mousedown", handleOverlayClose);
}

function closeModal(modal) {
  modal.classList.remove("modal__is-open");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClose);
}

// Open Preview Modal Function
function openPreviewModal(imageSrc, captionText) {
  previewModalImageEl.src = imageSrc;
  previewModalImageEl.alt = captionText;
  previewModalCaptionEl.textContent = captionText;
  openModal(previewModal);
}

// Handle Escape Key Close
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal__is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Handle Modal Overlay Close
function handleOverlayClose(evt) {
  if (
    evt.target === evt.currentTarget || // clicked on overlay itself
    evt.target.classList.contains("modal__close-btn") // or clicked close button
  ) {
    closeModal(evt.currentTarget);
  }
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleOverlayClose);
});

// Handle Profile Edit Form Submission
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

// Create Card Element
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardImageEl.addEventListener("click", () => {
    openPreviewModal(data.link, data.name);
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// Render Card with flexible insertion method (default prepend)
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

// Handle Add Card Submission
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCard, "prepend");

  cardForm.reset();

  const inputList = Array.from(cardForm.querySelectorAll(settings.inputSelector));
  const buttonElement = cardForm.querySelector(settings.submitButtonSelector);

  // Reset validation state for the form (disable button, clear errors)
  resetValidation(cardForm, inputList, settings);

  closeModal(cardModal);
}

// Open Edit Profile Modal + Reset Validation
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  const inputList = Array.from(editFormElement.querySelectorAll(settings.inputSelector));
  resetValidation(editFormElement, inputList, settings);

  const buttonElement = editFormElement.querySelector(settings.submitButtonSelector);
  disableButton(buttonElement, settings);

  openModal(editModal);
});

// Open Add Card Modal + Reset Validation
cardModalBtn.addEventListener("click", () => {
  const inputList = Array.from(cardForm.querySelectorAll(settings.inputSelector));
  resetValidation(cardForm, inputList, settings);

  const buttonElement = cardForm.querySelector(settings.submitButtonSelector);
  disableButton(buttonElement, settings);

  openModal(cardModal);
});

// Close Modals Buttons
editModalCloseBtn.addEventListener("click", () => closeModal(editModal));
cardModalCloseBtn.addEventListener("click", () => closeModal(cardModal));
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Form Submit Listeners
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Render Initial Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, "append"); // append initial cards at the end
});

// Enable Validation from validation.js
enableValidation(settings);