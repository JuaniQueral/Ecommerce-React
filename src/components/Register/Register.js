import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import ToggleTheme from '../ui/ToggleTheme';
import useWindowSize from '../custom/useWindowSize/useWindowSize';
import ComboLanguage from '../ui/ComboLanguage/ComboLanguage';
import useTranslation from '../custom/useTranslation/useTranslation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIContext } from '../services/api/api.context';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../services/theme/theme.context';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Agregamos estado para la contraseña

  const [errors, setErrors] = useState([
    { text: 'Nombre no puede ser vacío', isError: false },
    { text: 'Email no puede ser vacío', isError: false },
    { text: 'Password no puede ser vacío', isError: false },
  ]);

  const { handleLogin } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const { toggleLoading, setCartEmpty } = useContext(APIContext);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { width, height } = useWindowSize();
  const translate = useTranslation();

  const navigation = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const registerHandler = () => {
    if (name.length === 0) {
      nameRef.current.focus();
      nameRef.current.style.borderColor = 'red';
      nameRef.current.style.outline = 'none';
      const newErrors = [...errors];
      newErrors[0].isError = true;
      setErrors(newErrors);
      return;
    }

    if (email.length === 0) {
      emailRef.current.focus();
      emailRef.current.style.borderColor = 'red';
      emailRef.current.style.outline = 'none';
      const newErrors = [...errors];
      newErrors[1].isError = true;
      setErrors(newErrors);
      return;
    }

    if (password.length === 0) {
      passwordRef.current.focus();
      const newErrors = [...errors];
      newErrors[2].isError = true;
      setErrors(newErrors);
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    toggleLoading(true);

    fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Registro con éxito!', {
          position: 'top-center',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => {
          toggleLoading(false);
          navigation('/login');
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('Ocurrio un error el intentar registrarse', {
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

  return (
    <div className='login-container'>
      <div className={`login-box ${theme === 'dark' && 'login-box-dark'}`}>
        <h4>Registrate! Es rápido y fácil.</h4>
        <div className='input-container'>
          <input
            className='input-control'
            placeholder='Nombre'
            type='name'
            onChange={nameChangeHandler}
            value={name}
            ref={nameRef}
          />
        </div>
        {errors[0].isError && <p>{errors[0].text}</p>}
        <div className='input-container'>
          <input
            className='input-control'
            placeholder='Email'
            type='email'
            onChange={emailChangeHandler}
            value={email}
            ref={emailRef}
          />
        </div>
        {errors[1].isError && <p>{errors[1].text}</p>}
        <div className='input-container'>
          <input
            className='input-control'
            placeholder={translate('password')}
            type='password'
            onChange={passwordChangeHandler}
            value={password}
            ref={passwordRef}
          />
        </div>
        {errors[2].isError && <p>{errors[2].text}</p>}
        <button onClick={registerHandler} className='signin-button' type='button'>
          Registrarse
        </button>
        <Button
          onClick={() => {
            navigation('/home');
          }}
          className='mt-4'
          variant='text'
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default Register;
