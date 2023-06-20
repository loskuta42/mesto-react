import logoPath from '../images/Vector.svg';
import burgerButtonPath from '../images/burger_menu.svg';
import closeButtonPath from '../images/close_menu_button.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' && 'header_menu'}`}>
      <div className="header__logo-container">
        <img className="header__logo" src={logoPath} alt="Лого"/>
        {location.pathname === '/' &&
        <>
        <img onClick={props.handleClick} className={`menu__button ${props.isMenuOpen && 'menu__button_active'}`} src={props.isMenuOpen ? closeButtonPath : burgerButtonPath} alt='menu-button' />
        </>
        }
      </div>
      {location.pathname === '/' &&
        <>
      <div className={`menu ${props.isMenuOpen && 'menu_active'}`}>
        <p className='menu__user-email'>{props.userEmail}</p>
        <button className='menu__signout-button' type='button' onClick={props.onSignOut}>Выйти</button>
      </div>
        </>
      }

      {location.pathname === '/sign-in' &&
        <>
          <Link to={'/sign-up'} className='header__link'>Регистрация</Link>
        </>
      }

      {location.pathname === '/sign-up' &&
        <>
          <Link to={'/sign-in'} className='header__link'>Войти</Link>
        </>
      }
    </header>
  )
}

export default Header;
