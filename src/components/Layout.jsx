import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, Users, ShoppingCart, Activity } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Catálogo', path: '/catalog', role: 'specialist', icon: <Package size={20} /> },
    { name: 'Carrito', path: '/cart', role: 'specialist', icon: <ShoppingCart size={20} />, badge: cartItems.length > 0 ? cartItems.length : null },
    { name: 'Dashboard Admin', path: '/admin', role: 'admin', icon: <Users size={20} /> },
    { name: 'Mis Productos', path: '/provider', role: 'provider', icon: <Package size={20} /> },
  ];

  const filteredMenu = menuItems.filter(item => item.role === currentUser?.role);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="nav-brand" style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
          <Activity color="var(--primary)" size={28} />
          VeraBio
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredMenu.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`sidebar-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.name}</span>
              {item.badge && (
                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '99px', fontSize: '0.75rem' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
          <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentUser?.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              {currentUser?.role}
            </p>
          </div>
          <button 
            className="sidebar-link w-100" 
            style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--accent-danger)' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
