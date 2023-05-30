import {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({title: '', src: '', alt: ''});

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  return (
  <div className="page">
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer />
    <PopupWithForm name="edit" title="Редактировать профиль" submitButtonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <input id="name-input" className="form__input form__name" type="text" maxlength="40" minlength="2" name="name" placeholder="Имя" required/>
      <span className="form__input-error name-input-error"></span>
      <input id="profession-input" className="form__input form__profession" type="text" maxlength="200" minlength="2" name="profession" placeholder="О себе" required/>
      <span className="form__input-error profession-input-error"></span>
    </PopupWithForm>
    <PopupWithForm name="new-card" title="Новое место" submitButtonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <input id="card-name-input" className="form__input form__card-name" type="text" maxlength="30" minlength="2" name="name" placeholder="Название" required/>
      <span className="form__input-error card-name-input-error"></span>
      <input id="card-link-input" className="form__input form__card-link" type="url" name="link" placeholder="Ссылка на картинку" required/>
      <span className="form__input-error card-link-input-error"></span>
    </PopupWithForm>
    <PopupWithForm name ="avatar" title="Обновить аватар" submitButtonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <input id="avatar-link-input" className="form__input form__avatar-link" type="url" name="link" placeholder="Ссылка на картинку аватара" required/>
      <span className="form__input-error avatar-link-input-error"></span>
    </PopupWithForm>
    <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
    <PopupWithForm name="delete-card" submitButtonText="Да" />
    <div className="popup popup_type_delete-card">
      <div className="popup__container">
        <button className="popup__close-btn" type="button"></button>
        <form className="form" method="post" autocomplete="off" novalidate>
          <h2 className="form__title form__title_delete-card">Вы уверены?</h2>
          <button className="form__submit-button" type="submit">Да</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
