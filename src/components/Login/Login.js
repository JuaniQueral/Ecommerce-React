import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import ToggleTheme from '../ui/ToggleTheme';
import { ThemeContext } from '../services/theme/theme.context';
import useTranslation from '../custom/useTranslation/useTranslation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIContext } from '../services/api/api.context';
import { Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Agregamos estado para la contraseña
  const [errors, setErrors] = useState([
    { text: 'Email no puede ser vacío', isError: false },
    { text: 'Password no puede ser vacío', isError: false },
  ]);

  const { handleLogin } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const { toggleLoading, setCartEmpty } = useContext(APIContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const translate = useTranslation();

  const navigation = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const signInHandler = () => {
    if (email.length === 0) {
      emailRef.current.focus();
      emailRef.current.style.borderColor = 'red';
      emailRef.current.style.outline = 'none';
      const newErrors = [...errors];
      newErrors[0].isError = true;
      setErrors(newErrors);
      return;
    }

    if (password.length === 0) {
      passwordRef.current.focus();
      const newErrors = [...errors];
      newErrors[1].isError = true;
      setErrors(newErrors);
      return;
    }

    const data = {
      username: email,
      password: password,
    };

    toggleLoading(true);

    fetch('https://tup-ecommerce.onrender.com/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const token = response.token;
        fetch('https://tup-ecommerce.onrender.com/user/profile', {
          headers: {
            Authorization: `Bearer ${response.token}`,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            toggleLoading(false);
            handleLogin(email, token, response.role);
            setCartEmpty();
            navigation('/home');
          })
          .catch((error) => {
            console.log(error);
            toggleLoading(false);
            toast.error('El usuario o la contraseña no son correctos', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          });
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('El usuario o la contraseña no son correctos', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  const registerHendler = () => {
    navigation('/register');
  };

  return (
    <div className='login-container'>
      <div className={`login-box ${theme === 'dark' && 'login-box-dark'}`}>
        <div className='action-container'>
          {/* <ComboLanguage /> */}
          <ToggleTheme />
        </div>
        <h4>¡BIENVENIDO A LA TIENDA DE FERRECAS!</h4>
        <div className='input-container'>
          <input
            autoComplete='off'
            className='input-control'
            placeholder='Email'
            type='email'
            onChange={emailChangeHandler}
            value={email}
            ref={emailRef}
          />
        </div>
        {errors[0].isError && <p>{errors[0].text}</p>}
        <div className='input-container'>
          <input
            autoComplete='off'
            className='input-control'
            placeholder={translate('password')}
            type='password'
            onChange={passwordChangeHandler}
            value={password}
            ref={passwordRef}
          />
        </div>
        {errors[1].isError && <p>{errors[1].text}</p>}
        <button onClick={signInHandler} className='signin-button' type='button'>
          {translate('login')}
        </button>
        <Button onClick={registerHendler} className='mt-4' variant='text'>
          Registrarse
        </Button>
      </div>
    </div>
  );
};

export default Login;
