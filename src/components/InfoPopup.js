function InfoPopup(props) {
  return (
    <div className={`popup popup_type_info ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__info-container">
          <button onClick={props.onClose} className="popup__close-btn" type="button"></button>
          <img className="popup__image" src={props.imageSrc} alt={props.imageName}/>
          <p className="popup__info-text">{props.imageText}</p>
        </div>
        </div>

    </div>
  )
}

export default InfoPopup;
