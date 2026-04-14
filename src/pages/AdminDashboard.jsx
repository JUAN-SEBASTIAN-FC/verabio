import React, { useState, useEffect } from 'react';
import { getUsers, saveUsers } from '../utils/storage';
import { Check, X, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers().filter(u => u.role !== 'admin'));
  }, []);

  const handleVerify = (userId, status) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, isVerified: status };
      }
      return u;
    });
    setUsers(updatedUsers);
    
    // Guardar en persistencia global recuperando los admins que no están en el state local
    const allUsers = getUsers();
    const finalUsers = allUsers.map(u => 
      u.id === userId ? { ...u, isVerified: status } : u
    );
    saveUsers(finalUsers);
  };

  const pendingUsers = users.filter(u => !u.isVerified);
  const activeUsers = users.filter(u => u.isVerified);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2>Panel Administrativo</h2>
        <p style={{ color: 'var(--text-muted)' }}>Gestión y verificación de especialistas y proveedores</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Solicitudes Pendientes ({pendingUsers.length})
        </h3>
        {pendingUsers.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No hay solicitudes pendientes de validación.</p>
        ) : (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre/Razón Social</th>
                  <th>Email</th>
                  <th>Rol Solicitado</th>
                  <th>Documento/Certificado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td style={{ fontWeight: 500 }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                    <td>
                      <button className="btn btn-glass" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} onClick={() => alert('Simulación: Visor de PDF/Imagen del Certificado Médico')}>
                        <Eye size={14} /> Ver Certificado
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => handleVerify(user.id, true)}
                          className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', background: 'var(--accent-success)' }}
                          title="Aprobar"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => alert(`Simulación: Petición de usuario ${user.name} rechazada`)}
                          className="btn btn-danger-glass" style={{ padding: '0.25rem 0.5rem' }}
                          title="Rechazar"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Usuarios Verificados Activos</h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Gestión</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map(user => (
                <tr key={user.id}>
                  <td><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.id}</span></td>
                  <td>{user.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                  <td><span className="badge badge-success">Activo</span></td>
                  <td>
                    <button 
                      onClick={() => handleVerify(user.id, false)}
                      className="btn btn-danger-glass" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      Revocar Acceso
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
