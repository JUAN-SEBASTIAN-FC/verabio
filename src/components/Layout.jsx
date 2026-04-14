import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { 
  LogOut, Package, Users, ShoppingCart, Activity, 
  Moon, Sun, Menu, Search, User, ShieldCheck
} from 'lucide-react';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    { name: 'Red Médica', path: '/admin', role: 'admin', icon: <ShieldCheck size={20} /> },
    { name: 'Inventario', path: '/provider', role: 'provider', icon: <Package size={20} /> },
  ];

  const filteredMenu = menuItems.filter(item => item.role === currentUser?.role);

  return (
    <div className="app-wrapper">
      {/* SIDEBAR ESCRITORIO */}
      <aside className="desktop-sidebar">
        <div className="sidebar-header">
          <Activity color="var(--primary)" size={28} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>VeraBio</span>
        </div>

        <nav className="sidebar-menu">
          {filteredMenu.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`menu-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.name}</span>
              {item.badge && (
                <span className="badge badge-primary">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} color="var(--text-muted)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentUser?.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{currentUser?.role}</p>
            </div>
          </div>
          <button 
            className="menu-item" 
            style={{ width: '100%', color: 'var(--error)' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span style={{ flex: 1, textAlign: 'left' }}>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        
        {/* HEADER SUPERIOR */}
        <header className="top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Logo solo visible en móvil donde el sidebar no está */}
            <div className="mobile-only-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Activity color="var(--primary)" size={24} className="d-md-none" />
            </div>
            
            {/* Buscador Rápido Global (Mock visual) */}
            <div className="form-group" style={{ maxWidth: '300px', display: 'none', margin: 0 }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '12px', color: 'var(--text-muted)' }} />
                <input type="text" className="form-control" placeholder="Buscar en VeraBio..." style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.875rem' }} />
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '0.5rem', borderRadius: 'var(--radius-full)' }} aria-label="Cambiar tema">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* CONTENEDOR DE LA PÁGINA (Outlet) */}
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      {/* NAV INFERIOR (MÓVIL) */}
      <nav className="mobile-nav">
        {filteredMenu.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`mobile-nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            {item.icon}
            <span>{item.name}</span>
            {item.badge && (
               <span style={{ position: 'absolute', top: '8px', right: '50%', transform: 'translateX(20px)', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></span>
            )}
          </Link>
        ))}
        {/* Usamos el último botón para Perfil/Cerrar Sesión temporalmente */}
         <button className="mobile-nav-item" onClick={handleLogout} style={{ color: 'var(--error)' }}>
            <LogOut size={20} />
            <span>Salir</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
