import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);

  const handleLogin = (email, password) => {
    if (email === "admin" && password === "admin") {
      // Si el usuario y la contraseña son "admin", asigna el rol de "admin"
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      setUser({ email, role: "admin" });
    } else {
      // De lo contrario, asigna el rol de "cliente"
      localStorage.setItem("user", JSON.stringify({ email, role: "cliente" }));
      setUser({ email, role: "cliente" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
