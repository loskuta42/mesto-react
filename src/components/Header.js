import logoPath from '../images/Vector.svg';

function Header(props) {
    return (
      <header className="header">
        <img className="header__logo" src={logoPath} alt="Лого"/>
      </header>
    )
}

export default Header;