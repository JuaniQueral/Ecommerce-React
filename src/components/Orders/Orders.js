import React, { useState, useEffect, useContext } from 'react';
import { APIContext } from '../services/api/api.context';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const { toggleLoading } = useContext(APIContext);
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigate();

  useEffect(() => {
    toggleLoading(true);
    fetch('http://localhost:8080/order/mis-pedidos', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((ordersData) => {
        setOrders(ordersData);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toggleLoading(false);
      });
  }, []);

  return (
    <div className='app-container'>
      <Button
        onClick={() => {
          navigation('/home');
        }}
      >
        Volver
      </Button>
      <h1>Mis Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Precio Total</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.totalPrice}</td>
              <td>{order.date}</td>
              <td>{order.firstName}</td>
              <td>{order.lastName}</td>
              <td>{order.email}</td>
              <td>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.name} (Cantidad: {item.quantity})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
