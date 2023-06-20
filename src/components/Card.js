import { currentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';


function Card(props) {

  const currentUser = useContext(currentUserContext);

  const isOwn = props.card.owner._id === currentUser._id

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function cardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card" key={props.card._id}>
      {isOwn && <button onClick={cardDelete} type="button" className="card__basket" ></button>}
      <img onClick={handleClick} className="card__image" src={props.card.link} alt={props.card.name}/>
      <div className="card__bottom-container">
        <p className="card__name">{props.card.name}</p>
        <div className="card__like-container">
          <button onClick={props.onCardLike} type="button" className={cardLikeButtonClassName}></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
