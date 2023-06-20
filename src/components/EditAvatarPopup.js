import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"


function EditAvatarPopup(props) {
  const imgRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAvatarUpdate({avatar: imgRef.current.value});
  }

  useEffect(() => {
    imgRef.current.value = '';
}, [props.isOpen]);

  return (
    <PopupWithForm name ="avatar" title="Обновить аватар" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={imgRef} id="avatar-link-input" className="form__input form__avatar-link" type="url" name="link" placeholder="Ссылка на картинку аватара" required/>
      <span className="form__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
