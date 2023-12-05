import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigation = useNavigate();

  const goBackHandler = () => {
    navigation('/home');
  };

  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <h1>Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no está disponible.</p>
        <button onClick={goBackHandler} className='back-button'>
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default NotFound;
