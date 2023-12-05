import React, { useState } from 'react';

const UserForm = ({ addUser, updateUser, editing, setEditing, currentUser }) => {
  const initialFormState = { id: 0, name: '', email: '', role: 'USER', password: '' };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.email || !user.password) return;

    if (editing) {
      updateUser(user.id, user);
      setEditing(false);
    } else {
      addUser(user);
    }

    setUser(initialFormState);
  };

  // Set user data for editing
  React.useEffect(() => {
    if (editing) {
      setUser(currentUser);
    } else {
      setUser(initialFormState);
    }
  }, [editing, currentUser]);

  return (
    <form onSubmit={handleSubmit} className='user-form'>
      <label>Nombre:</label>
      <input autoComplete='off' type='text' name='name' value={user.name} onChange={handleInputChange} />
      <label>Email:</label>
      <input autoComplete='off' type='text' name='email' value={user.email} onChange={handleInputChange} />
      <label>Rol:</label>
      <select name='role' value={user.role} onChange={handleInputChange}>
        <option value='ROOT'>Root</option>
        <option value='ADMIN'>Admin</option>
        <option value='USER'>User</option>
      </select>
      {!editing && (
        <>
          <label>Contraseña:</label>
          <input
            autoComplete='off'
            type='password'
            name='password'
            value={user.password}
            onChange={handleInputChange}
          />
        </>
      )}
      <div className='mt-3'>
        <button type='submit' className={editing ? 'update-btn' : 'add-btn'}>
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
        {editing && (
          <button className='cancel-btn' onClick={() => setEditing(false)}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
