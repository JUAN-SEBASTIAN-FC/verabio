import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, UserPlus, FileText } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'specialist' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register(formData);
      setSuccess('Registro exitoso. Tu cuenta se encuentra en revisión. Una vez el administrador valide tu certificado, podrás acceder.');
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="particle-bg"></div>
      
      <div className="glass-panel" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '500px', padding: '2.5rem', animation: 'pageEnter var(--transit-slow)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Activity color="var(--primary)" size={32} style={{ marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Crear Cuenta en <span className="text-gradient">VeraBio</span></h2>
          <p className="caption">Solicita tu acceso a la red médica exclusiva</p>
        </div>

        {error && <div style={{ padding: '0.75rem 1rem', background: 'var(--error-bg)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
        {success && <div style={{ padding: '0.75rem 1rem', background: 'var(--success-bg)', color: 'var(--success)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="form-group">
            <label className="form-label">Nombre Completo / Clínica</label>
            <input name="name" type="text" className="form-control" required value={formData.name} onChange={handleChange} placeholder="Ej. Dr. Juan Pérez / Centro Estético..." />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Correo Profesional</label>
              <input name="email" type="email" className="form-control" required value={formData.email} onChange={handleChange} placeholder="dr@clinic.com" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Contraseña</label>
              <input name="password" type="password" className="form-control" required value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Acceso</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
              <option value="specialist">Especialista (Comprador validado)</option>
              <option value="provider">Proveedor (Vendedor de Insumos)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Licencia Médica o Certificación <span style={{color: 'var(--text-muted)'}}>(PDF/JPG)</span></label>
            <div style={{ border: '2px dashed var(--border-hover)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'background var(--transit-fast)' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-card-solid)'} onMouseOut={e => e.currentTarget.style.background = 'var(--bg-secondary)'}>
               <FileText color="var(--primary)" size={24} />
               <span className="caption">Haz clic para subir archivo (Mock)</span>
               <input type="file" style={{ display: 'none' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            <UserPlus size={18} /> Enviar Solicitud de Validación
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p className="caption">
            ¿Ya tienes acceso? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
