import React, { useState, useEffect } from 'react';
import { getUsers, saveUsers } from '../utils/storage';
import { Check, X, Eye, ShieldAlert, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers().filter(u => u.role !== 'admin'));
  }, []);

  const handleVerify = (userId, status) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, isVerified: status } : u);
    setUsers(updatedUsers);
    
    const allUsers = getUsers();
    const finalUsers = allUsers.map(u => u.id === userId ? { ...u, isVerified: status } : u);
    saveUsers(finalUsers);
  };

  const pendingUsers = users.filter(u => !u.isVerified);
  const activeUsers = users.filter(u => u.isVerified);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldAlert size={28} color="var(--primary)" />
          <h2>Centro de Operaciones</h2>
        </div>
        <p className="caption">Plataforma central de validación técnica de profesionales y distribuidores.</p>
      </div>

      {/* Bloque de pendientes */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.125rem' }}>Solicitudes de Ingreso</h3>
          <span className="badge badge-warning">{pendingUsers.length} Pendientes</span>
        </div>
        
        {pendingUsers.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
             <UserCheck size={48} color="var(--text-muted)" style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
             <p className="caption">La red está al día. No hay solicitudes pendientes de validación técnica.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: '1.5rem' }}>Identidad Reclamada</th>
                  <th>Contacto</th>
                  <th>Rol Solicitado</th>
                  <th>Documento (Evidencia)</th>
                  <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Resolución</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(user => (
                  <tr key={user.id}>
                    <td style={{ paddingLeft: '1.5rem' }}>
                      <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</p>
                      <p className="caption" style={{ fontSize: '0.75rem' }}>ID: {user.id}</p>
                    </td>
                    <td><span className="caption">{user.email}</span></td>
                    <td>
                      <span className={`badge ${user.role === 'provider' ? 'badge-primary' : 'badge-success'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }} onClick={() => alert('Mock: Descargando PDF Seguro')}>
                        <Eye size={14} /> Revisar Archivo
                      </button>
                    </td>
                    <td style={{ paddingRight: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleVerify(user.id, true)}
                          className="btn btn-success" style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)' }}
                          title="Aprobar el acceso a la red"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => alert(`Mock: Solicitud de ${user.name} ha sido rechazada y notificada.`)}
                          className="btn btn-danger" style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)' }}
                          title="Rechazar solicitud"
                        >
                          <X size={18} />
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

      {/* Bloque de Usuarios Activos */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
          <h3 style={{ fontSize: '1.125rem' }}>Control de Actores Verificados</h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '1.5rem' }}>ID Cripto / Interno</th>
                <th>Nombre Autorizado</th>
                <th>Rol Técnico</th>
                <th>Estatus en Red</th>
                <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Gestión de Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Ningún usuario verificado</td>
                </tr>
              ) : (
                activeUsers.map(user => (
                  <tr key={user.id}>
                    <td style={{ paddingLeft: '1.5rem' }}><span className="num-data caption">{user.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{user.name}</td>
                    <td>
                       <span className={`badge ${user.role === 'provider' ? 'badge-primary' : 'badge-success'}`}>
                         {user.role}
                       </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></span>
                         <span className="caption">Operativo</span>
                      </div>
                    </td>
                    <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleVerify(user.id, false)}
                        className="btn btn-ghost" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: 'var(--error)' }}
                      >
                        Suspender Acceso
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
