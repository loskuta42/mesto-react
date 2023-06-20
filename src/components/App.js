import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup"
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ProtectedRouteElement from './ProtectedRoute';
import api from '../utils/api';
import { currentUserContext, loggedInContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import * as auth from '../utils/auth.js';
import iconOkPath from '../images/icon_ok.svg';
import iconErrorPath from '../images/icon_error.svg';
import InfoPopup from './InfoPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOkInfoPopupOpen, setIsOkInfoPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isErrorInfoPopupOpen, setIsErrorInfoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({_id:'', email: ''});

  useEffect(() => {
    Promise.all([api.getCardsInfo(), api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
        setCards(dataCards);
        setCurrentUser(dataUser);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);


  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setIsOkInfoPopupOpen(false);
    setIsErrorInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => {console.log(err);});
}
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .catch(err => {console.log(err);});

      setCards((cards) => cards.filter((item) => item._id !== card._id))
  }

  function handleUpdateUser(addedInfo) {
    api.upgradeUserData(addedInfo)
      .then((updatedData) => {setCurrentUser(updatedData)})
      .catch(err => {console.log(err);})
    closeAllPopups();
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCardToServer(cardInfo)
      .then((newCard) => {setCards([newCard, ...cards])})
      .catch(err => {console.log(err);})
    closeAllPopups();
  }

  function handleUpdateAvatar(avatarLink) {
    api.upgradeUserAvatar(avatarLink)
      .then((updatedData) => {setCurrentUser(updatedData)})
      .catch(err => {console.log(err);})
    closeAllPopups();
  }

  function handleSingUpSubmit ({email, password}) {
    if (email && password) {
      return auth.register(password, email)
        .then((res) => {
          navigate('/sign-in', {replace: true});
          setIsOkInfoPopupOpen(true);
          return res;
        })
        .catch((err)=> {
          setIsErrorInfoPopupOpen(true);
          console.log(err);
        });
    }

  }

  function handleSingInSubmit({email, password}) {
    if (email && password) {
      return auth.authorize(password, email)
        .then((data) => {
          if (data.token) {
            handleLogin();
            navigate('/', {replace: true});
            return data;
          }
        })
        .catch((err)=> {
          setIsErrorInfoPopupOpen(true);
          console.log(err);
        });

    }

  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((data) => {
          if (data) {
            handleLogin();
            console.log(data);
            navigate('/', {replace: true});
            setUserData(data.data);
            return data;
          }
        });
    }
  }, [navigate]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserData({_id:'', email: ''});
  }

  function handleClickMenuButton() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
  <div className="page">
      <loggedInContext.Provider value={loggedIn}>
        <currentUserContext.Provider value={currentUser}>
        <Header
          onSignOut={handleSingOut}
          userEmail={userData.email}
          isMenuOpen={isMenuOpen}
          handleClick={handleClickMenuButton}
        />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete} loggedIn={loggedIn} />} />
          <Route path='/sign-up' element={
          <Login
            title='Регистрация'
            name='sign-up'
            submitButtonText='Зарегистрироваться'
            handleSubmit={handleSingUpSubmit}
            />}
          />
        <Route path='/sign-in' element={
        <Login
          title='Вход'
          name='sign-in'
          submitButtonText='Войти'
          handleSubmit={handleSingInSubmit}
        />} />
        </Routes>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onAvatarUpdate={handleUpdateAvatar}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <PopupWithForm name="delete-card" submitButtonText="Да" />
        <InfoPopup
          isOpen={isOkInfoPopupOpen}
          onClose={closeAllPopups}
          imageSrc={iconOkPath}
          imageName={'ok-icon'}
          imageText={'Вы успешно зарегистрировались!'}
        />
        <InfoPopup
          isOpen={isErrorInfoPopupOpen}
          onClose={closeAllPopups}
          imageSrc={iconErrorPath}
          imageName={'error-icon'}
          imageText={'Что-то пошло не так! Попробуйте ещё раз.'}
        />
        </currentUserContext.Provider>
      </loggedInContext.Provider>
      <div className="popup popup_type_delete-card">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <form className="form" method="post" autocomplete="off" novalidate>
            <h2 className="form__title form__title_delete-card">Вы уверены?</h2>
            <button className="form__submit-button" type="submit">Да</button>
          </form>
        </div>
      </div>
  </div>
  );
}

export default App;
