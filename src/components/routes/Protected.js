import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthenticationContext } from '../services/authentication/authentication.context';

const Protected = ({ children, role }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (role) {
    if (user.role !== role) {
      return <Navigate to='/not-found' replace />;
    }
  }

  return children;
};

export default Protected;
