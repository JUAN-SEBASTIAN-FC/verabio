import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, UserPlus } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'specialist'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(formData);
      setSuccess('Registro exitoso. Tu cuenta debe ser validada por un administrador antes de poder iniciar sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="particle-bg"></div>
      
      <div className="auth-card glass-panel" style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <Activity color="var(--primary)" size={32} />
        </div>
        <div>
          <h2 className="text-gradient">Crear Cuenta</h2>
          <p style={{ color: 'var(--text-muted)' }}>Únete a la red médica exclusiva</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', textAlign: 'left' }}>
          
          <div className="form-group">
            <label className="form-label">Nombre Completo / Razón Social</label>
            <input 
              name="name"
              type="text" 
              className="form-control" 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input 
              name="email"
              type="email" 
              className="form-control" 
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              name="password"
              type="password" 
              className="form-control" 
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Cuenta</label>
            <select 
              name="role" 
              className="form-control" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="specialist">Especialista (Médico, Odontólogo, etc.)</option>
              <option value="provider">Proveedor de Insumos</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Certificado Profesional (Mock solo visual)</label>
            <input 
              type="file" 
              className="form-control" 
            />
            <small style={{ color: 'var(--text-muted)' }}>Sube tu credencial en formato PDF o JPG para verificación.</small>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <UserPlus size={18} /> Solicitar Registro
          </button>
        </form>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
