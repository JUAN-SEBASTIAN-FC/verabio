import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, saveUsers, initStorage } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initStorage();
    const storedUser = localStorage.getItem('verabio_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.isVerified && user.role !== 'admin') {
      throw new Error('Su cuenta está pendiente de validación por el administrador.');
    }

    setCurrentUser(user);
    localStorage.setItem('verabio_current_user', JSON.stringify(user));
    return user;
  };

  const register = (userData) => {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('El correo ya está registrado');
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      isVerified: false // Todos requieren validación inicialmente
    };

    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('verabio_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
