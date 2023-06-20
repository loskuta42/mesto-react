import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"


function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
      setName('');
      setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm name="new-card" title="Новое место" submitButtonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="card-name-input" className="form__input form__card-name" type="text" maxlength="30" minlength="2" name="name" placeholder="Название" value={name} onChange={handleNameChange} required/>
      <span className="form__input-error card-name-input-error"></span>
      <input id="card-link-input" className="form__input form__card-link" type="url" name="link" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange} required/>
      <span className="form__input-error card-link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
