import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={
        currentUser.role === 'admin' ? '/admin' :
        currentUser.role === 'provider' ? '/provider' : '/catalog'
      } replace />} />
      <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/catalog" replace />} />
      
      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas Privadas */}
      <Route element={<Layout />}>
        {/* Rutas para Especialistas */}
        <Route element={<PrivateRoute allowedRoles={['specialist']} />}>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Rutas para Administradores */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Rutas para Proveedores */}
        <Route element={<PrivateRoute allowedRoles={['provider']} />}>
          <Route path="/provider" element={<ProviderDashboard />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
