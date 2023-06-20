function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <h2 className="popup__title">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
