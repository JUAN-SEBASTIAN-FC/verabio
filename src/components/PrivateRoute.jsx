import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="auth-container">Cargando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles permitidos y el usuario no los tiene
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
