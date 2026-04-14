import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, LogIn } from 'lucide-react';

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
      // Redirigir según el rol
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'provider') navigate('/provider');
      else navigate('/catalog');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Efecto de partículas antigravitacionales simulado con CSS radial gradients y animación */}
      <div className="particle-bg"></div>
      
      <div className="auth-card glass-panel" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Activity color="var(--primary)" size={48} />
        </div>
        <div>
          <h1 className="text-gradient">VeraBio</h1>
          <p style={{ color: 'var(--text-muted)' }}>Adquisición de material médico</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group" style={{ textAlign: 'left' }}>
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

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            <LogIn size={18} /> Iniciar Sesión
          </button>
        </form>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ¿No tienes una cuenta? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Regístrate aquí</Link>
        </div>
        
        {/* Credenciales de prueba */}
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left' }}>
          <strong>Credenciales de prueba:</strong><br/>
          Admin: admin@verabio.com / password123<br/>
          Especialista: jane@clinic.com / password123<br/>
          Proveedor: sales@medtech.com / password123
        </div>
      </div>
    </div>
  );
};

export default Login;
