import {useContext} from 'react';
import Card from './Card';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(currentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-info-container">
          <div className="profile__avatar-photo-container">
            <img onClick={props.onEditAvatar} className="profile__avatar" src={currentUser.avatar} alt="avatar"/>
          </div>
          <div className="profile__info-container">
            <div className="profile__name-edit-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
            </div>
            <h2 className="profile__profession">{currentUser.about}</h2>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="cards">
        {props.cards.map((card, i) => (
          <Card card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </>
)
}

export default Main;
