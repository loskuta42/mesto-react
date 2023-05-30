const editButtonPopup = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image')

const personName = document.querySelector('.profile__name');
const personProfession = document.querySelector('.profile__profession');

const nameInput = document.querySelector('.form__name');
const professionInput = document.querySelector('.form__profession');


const cardsContainer = document.querySelector('.cards');

const profileAvatar = document.querySelector('.profile__avatar');

const avatarInput = document.querySelector('.form__avatar-link');

const formClassArray = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const formList = Array.from(document.querySelectorAll(formClassArray.formSelector));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  editButtonPopup,
  newCardButton,
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  personName,
  personProfession,
  nameInput,
  professionInput,
  cardsContainer,
  formClassArray,
  formList,
  initialCards,
  profileAvatar,
  avatarInput
}
