function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card" key={props.card.id}>
      <button type="button" className="card__basket" ></button>
      <img onClick={handleClick} className="card__image" src={props.card.src} alt={props.card.name}/>
      <div className="card__bottom-container">
        <p className="card__name">{props.card.title}</p>
        <div className="card__like-container">
          <button type="button" className="card__like"></button>
          <p className="card__like-counter">{props.card.like}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
