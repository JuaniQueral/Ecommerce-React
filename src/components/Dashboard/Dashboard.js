import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import ToggleTheme from '../ui/ToggleTheme';
import { APIContext } from '../services/api/api.context';
import ToolsFilter from '../ToolFilter/ToolFilter';
import Tools from '../Tools/Tools';
import { RiShoppingCartLine } from 'react-icons/ri';
import './Dashboard.css'; // Agrega un archivo CSS para estilos
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Role } from '../models/constantes';

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);
  const { toggleLoading, cart, handleAddItemToCart } = useContext(APIContext);

  const userName = user.email.split('@')[0];

  const [tools, setTools] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/product', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((toolsData) => {
        setTools(toolsData);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toggleLoading(false);
      });
  }, []);

  const navigation = useNavigate();

  const addItemCart = (item) => {
    handleAddItemToCart(item);
    toast.success('Producto agregado!', {
      position: 'top-center',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const filterNameChanged = (name) => {
    setFilterName(name);
  };

  const onLogoutHandler = () => {
    handleLogout();
    navigation('/login');
  };

  const toggleShoppingCart = () => {
    if (cart.length === 0) {
      toast.warn('Debe agregar algún item al carrito', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    navigation('/cart');
  };

  return (
    <>
      <div className='container-global'>
        <Row className='me-2 my-4'>
          <Col>
            <div className='d-flex '>
              <h4 className='text-left m-3'>Hola {userName}</h4>
              {user.role === Role.ROOT && <Button onClick={() => navigation('/users')}>Ver usuarios</Button>}
              {user.role === Role.ADMIN && <Button onClick={() => navigation('/products')}>Ver productos</Button>}
              {user.role === Role.USER && <Button onClick={() => navigation('/orders')}>Mis pedidos</Button>}
            </div>
          </Col>
          <Col md={3} className='d-flex justify-content-end actionButton'>
            <ToggleTheme />
            <Button className='' variant='primary' onClick={onLogoutHandler}>
              Cerrar sesión
            </Button>
          </Col>
        </Row>

        <Row className='me-2 my-4'>
          {user.role === Role.USER && (
            <div className='cart d-flex justify-content-end'>
              <Button onClick={toggleShoppingCart} className='btn btn-success'>
                <RiShoppingCartLine size={44} />
                <span className='item_total'>{cart ? cart.length : 0}</span>
              </Button>
            </div>
          )}
        </Row>

        <ToolsFilter filterName={filterName} onFilterNameChange={filterNameChanged} />
        <Tools filterName={filterName} tools={tools} addItemCart={addItemCart} />
      </div>
    </>
  );
};

export default Dashboard;
