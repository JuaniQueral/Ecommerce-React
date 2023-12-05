import { createContext, useState } from 'react';

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem('user'));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);

  const handleLogin = (email, token, role) => {
    let userObject = { email: email, role: role, token: token };
    localStorage.setItem('user', JSON.stringify(userObject));
    setUser(userObject);
  };

  const handleLogout = () => {
    localStorage.clear();
    // localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
