import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState('');
  const [description, setDesctiption] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDesctiption(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDesctiption(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
  <PopupWithForm name="edit" title="Редактировать профиль" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    <input id="name-input" className="form__input form__name" type="text" maxlength="40" minlength="2" name="name" placeholder="Имя" value={name} onChange={handleNameChange} required/>
    <span className="form__input-error name-input-error"></span>
    <input id="profession-input" className="form__input form__profession" type="text" maxlength="200" minlength="2" name="profession" placeholder="О себе" value={description} onChange={handleDescriptionChange} required/>
    <span className="form__input-error profession-input-error"></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;
