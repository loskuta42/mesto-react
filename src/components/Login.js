import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login(props) {
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function resetForm() {
      setEmail('');
      setPassword('');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.handleSubmit({email: email, password: password})
      .then((res)=> {
        resetForm();
      });

  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
          navigate('/', {replace: true});
        }
    }, []);


  return (
      <form className="login" method="post" autocomplete="off" novalidate name={props.name} onSubmit={handleFormSubmit}>
        <h2 className="login__title">{props.title}</h2>
        <input id="email-input" className="login__input login__email" type="email" maxlength="100" minlength="5" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required/>
        <span className="login__input-error email-input-error"></span>
        <input id="password-input" className="login__input login__password" type="password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} required/>
        <span className="form__input-error password-input-error"></span>
        <button className="login__submit-button" type="submit">{props.submitButtonText}</button>
        {location.pathname === '/sign-up' && <Link to={'/sign-in'} className='login__bottom-text'>Уже зарегистрированы? Войти</Link>}
      </form>
  )
}

export default Login;
