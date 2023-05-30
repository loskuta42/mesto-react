import {useState, useEffect} from 'react';
import api from "../utils/api";
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCardsInfo()
      .then(res => {
        const arr = res.map((item) => {
          return {
            src: item.link,
            alt: item.name,
            title: item.name,
            like: item.likes.length,
            id: item._id,
            ownerId: item.owner._id
        }
        })
        setCards(arr);
      })
      .catch(err => {console.log(err);})
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {console.log(err);})
  },[])

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-info-container">
          <div className="profile__avatar-photo-container">
            <img onClick={props.onEditAvatar} className="profile__avatar" src={userAvatar} alt="avatar"/>
          </div>
          <div className="profile__info-container">
            <div className="profile__name-edit-container">
              <h1 className="profile__name">{userName}</h1>
              <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
            </div>
            <h2 className="profile__profession">{userDescription}</h2>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="cards">
        {cards.map((card, i) => (
          <Card card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </>
)
}

export default Main;
