function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image${props.card.src && ' popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
        <img className="popup__image" src={props.card.src} alt={props.card.alt}/>
        <h2 className="popup__title">{props.card.title}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
