import React, { useContext, useEffect, useState } from 'react';
import './Users.css';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { APIContext } from '../services/api/api.context';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { toggleLoading } = useContext(APIContext);
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigate();
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '' });

  // TODO: Se esta ejecutando 2 veces
  useEffect(() => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/user', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toggleLoading(false);
      });
  }, []);

  const addUser = (userData) => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/user/create', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Alta con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setUsers([...users, { id: users.length + 1, ...response }]);
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('Ocurrio un error el dar de alta el usuario', {
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

  const deleteUser = (id) => {
    toggleLoading(true);
    fetch(`https://tup-ecommerce.onrender.com/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Eliminacion con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setUsers(users.filter((user) => user.id !== id));
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('No se pudo eliminar el usuario.', {
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

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (id, updatedUser) => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/user', {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Actualizacion con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('No se pudo actualizar el usuario.', {
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
    <div className='app-container'>
      <Button
        onClick={() => {
          navigation('/home');
        }}
      >
        Volver
      </Button>
      <h1>ABM de Usuarios</h1>
      <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default Users;
