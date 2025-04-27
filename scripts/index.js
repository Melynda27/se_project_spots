const initialCards = [
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
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

// Functions to Open and Close Modals
function openModal(modal) {
  modal.classList.add("modal__is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal__is-open");
}

// Function to Handle Profile Edit Form Submission
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

// Function to Create a New Card Element
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
      openModal(previewModal);
      previewModalImageEl.src = data.link;
      previewModalImageEl.alt = data.name;
      previewModalCaptionEl.textContent = data.name;
  });

  cardDeleteBtn.addEventListener("click", () => {
      cardElement.remove();
  });

  return cardElement;
}

// Function to Handle Adding a New Card
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const value = {name: captionInput.value, link: cardLinkInput.value };
  const cardEl = getCardElement (values);
  cardsList.prepend(cardEl);
  evt.target.reset(cardForm);
  disableButton(cardForm)
  toggleButtonState(cardForm);
  closeModal(cardModal);
  cardForm.reset(cardModal);

}

// Event Listeners for Opening Modals
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

// Event Listeners for Closing Modals
editModalCloseBtn.addEventListener("click", () => closeModal(editModal));
cardModalCloseBtn.addEventListener("click", () => closeModal(cardModal));
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Event Listeners for Form Submissions
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Initial Card Rendering
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});