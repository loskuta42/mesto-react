function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
        <form className="form" method="post" autocomplete="off" novalidate name={props.name} onSubmit={props.onSubmit}>
          <h2 className={`form__title${props.name === 'delete-card' && ' form__title_delete-card'}`}>{props.title}</h2>
          {props.children}
          <button className="form__submit-button" type="submit">{props.submitButtonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
