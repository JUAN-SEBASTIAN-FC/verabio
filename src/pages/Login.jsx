import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, LogIn, ChevronRight } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'provider') navigate('/provider');
      else navigate('/catalog');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Fondo Premium Antigravedad */}
      <div className="particle-bg"></div>

      <div className="glass-panel" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', padding: '3rem 2.5rem', animation: 'pageEnter var(--transit-slow)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-glow)', marginBottom: '1rem' }}>
            <Activity color="var(--primary)" size={36} />
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Bienvenido a <span className="text-gradient">VeraBio</span></h1>
          <p className="caption">Plataforma exclusiva de adquisición médica</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', animation: 'pageEnter 0.2s' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="dr.smith@clinic.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            <LogIn size={18} /> Iniciar Sesión <ChevronRight size={18} style={{ marginLeft: 'auto' }} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p className="caption">
            ¿No tienes una cuenta validada? <br/>
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem' }}>Solicitar acceso como profesional</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
