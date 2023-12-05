import React, { useContext, useState } from 'react';
import { APIContext } from '../services/api/api.context';
import { useNavigate } from 'react-router';
import './ShoppingCartView.css';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { toast } from 'react-toastify';

const ShoppingCartView = () => {
  const { cart, updateCartQuantity, toggleLoading, setCartEmpty } = useContext(APIContext);
  const { user } = useContext(AuthenticationContext);

  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addOrder = () => {
    toggleLoading(true);
    const orderItemFormat = cart.map((item) => {
      return { id: 0, quantity: item.quantity, product: { id: item.productId } };
    });
    const order = {
      id: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      address: formData.address,
      email: formData.email,
      orderItems: orderItemFormat,
    };
    fetch('https://tup-ecommerce.onrender.com/order/create', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCartEmpty();
        toast.success('!Pedido enviado con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => {
          toggleLoading(false);
          homePage();
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('Ocurrio un error el dar de alta el pedido', {
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

  const homePage = () => {
    navigation('/home');
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.amount * item.quantity, 0);
    return totalPrice.toFixed(2); // Redondea el precio a dos decimales
  };

  return (
    <div className='shopping-cart-container'>
      <button className='back-button' onClick={homePage}>
        Volver
      </button>
      <h2>Mi Pedido</h2>
      <ul className='cart-items'>
        {cart.map((item, index) => (
          <li key={index} className='cart-item'>
            <img src={item.productImageUrl} alt='img' />
            <div className='item-details'>
              <div className='product-info'>
                <span className='product-name'>{item.productName}</span>
                <span className='product-price'>${item.amount.toFixed(2)}</span>
              </div>
              <span className='product-quantity'>Cantidad: {item.quantity}</span>
              <button className='quantity-button decrease' onClick={() => updateCartQuantity(index, item.quantity - 1)}>
                -
              </button>
              <button className='quantity-button increase' onClick={() => updateCartQuantity(index, item.quantity + 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className='total-price'>Precio Total de la Orden: ${calculateTotalPrice()}</div>
      <h3>Completa tu Pedido</h3>
      {/* <form className='order-form'> */}
      <label>
        Nombre:
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Apellido:
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Ciudad:
        <input type='text' name='city' value={formData.city} onChange={handleChange} />
      </label>
      <br />
      <label>
        Dirección:
        <input type='text' name='address' value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type='email' name='email' value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button onClick={addOrder} className='complete-order-button back-button'>
        Completar Pedido
      </button>
      {/* </form> */}
    </div>
  );
};

export default ShoppingCartView;
