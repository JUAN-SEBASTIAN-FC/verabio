import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Package as PackageIcon, Tag, AlertCircle } from 'lucide-react';

const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', category: '', description: '', price: '', imageUrl: '', status: 'active' });

  useEffect(() => {
    setProducts(getProducts().filter(p => p.providerId === currentUser.id));
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allProducts = getProducts();
    let updatedProducts;

    if (formData.id) {
      updatedProducts = allProducts.map(p => p.id === formData.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p);
    } else {
      const newProduct = { ...formData, id: `prod_${Date.now()}`, providerId: currentUser.id, price: parseFloat(formData.price), reviews: [] };
      updatedProducts = [...allProducts, newProduct];
    }
    
    saveProducts(updatedProducts);
    setProducts(updatedProducts.filter(p => p.providerId === currentUser.id));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if(confirm('¿Seguro que deseas eliminar este insumo de forma permanente?')) {
      const allProducts = getProducts();
      const updatedProducts = allProducts.filter(p => p.id !== id);
      saveProducts(updatedProducts);
      setProducts(updatedProducts.filter(p => p.providerId === currentUser.id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Gestión de Inventario</h2>
          <p className="caption">Administra tus insumos médicos publicados en la red VeraBio.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setFormData({ id: '', name: '', category: '', description: '', price: '', imageUrl: '', status: 'active' }); setShowModal(true); }}
        >
          <Plus size={18} /> Publicar Nuevo Insumo
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '0', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {products.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', padding: '5rem 2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
               <PackageIcon size={48} color="var(--text-muted)" style={{ opacity: 0.5 }} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Tu catálogo está vacío</h3>
            <p className="caption">Comienza publicando equipo médico esterilizado o insumos para que los especialistas puedan adquirirlos.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  <th style={{ paddingLeft: '1.5rem', borderTopLeftRadius: 'var(--radius-lg)' }}>Identificador / Muestra</th>
                  <th>Especificación</th>
                  <th>Clasificación</th>
                  <th style={{ textAlign: 'right' }}>Valor Comercial</th>
                  <th>Disponibilidad</th>
                  <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={{ paddingLeft: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span className="num-data caption" style={{ fontSize: '0.75rem' }}>{product.id}</span>
                      </div>
                    </td>
                    <td>
                       <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{product.name}</p>
                       <p className="caption" style={{ fontSize: '0.75rem', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</p>
                    </td>
                    <td><span className="badge badge-primary" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-glass)' }}><Tag size={12} style={{ marginRight: '4px' }} />{product.category}</span></td>
                    <td className="num-data" style={{ textAlign: 'right', fontWeight: 500 }}>${product.price.toFixed(2)}</td>
                    <td>
                      {product.status === 'active' ? (
                        <span className="badge badge-success">Activo</span>
                      ) : (
                        <span className="badge badge-warning badge-low-stock" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <AlertCircle size={12} /> Agotado
                        </span>
                      )}
                    </td>
                    <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => { setFormData({...product}); setShowModal(true); }}
                          className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '8px', color: 'var(--primary)' }}
                          title="Editar Ficha"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '8px', color: 'var(--error)' }}
                          title="Retirar de circulación"
                        >
                          <Trash2 size={16} />
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

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'pageEnter 0.2s' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '2.5rem', background: 'var(--bg-main)' }}>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>{formData.id ? 'Modificar Ficha Técnica' : 'Declaración de Nuevo Insumo'}</h3>
              <p className="caption">Toda la información es visible directamente a la red de especialistas certificados.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Denominación Técnica / Nombre del Producto</label>
                <input required type="text" className="form-control" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej: Ácido Hialurónico Inyectable 2ml" />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1 1 200px' }}>
                  <label className="form-label">Categoría Médica</label>
                  <input required type="text" className="form-control" name="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Ej: Medicina Estética" />
                </div>
                <div className="form-group" style={{ flex: '1 1 120px' }}>
                  <label className="form-label">Valor Comercial ($)</label>
                  <input required type="number" step="0.01" className="form-control num-data" name="price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Especificaciones e Indicaciones</label>
                <textarea required className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detalles de manufactura, certificados sanitarios, etc..."></textarea>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '2 1 300px' }}>
                  <label className="form-label">Evidencia Gráfica (URL Imagen Segura)</label>
                  <input required type="url" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group" style={{ flex: '1 1 150px' }}>
                  <label className="form-label">Estado Logístico</label>
                  <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Stock Disponible</option>
                    <option value="out_of_stock">Agotado / Retenido</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{formData.id ? 'Guardar Modificaciones' : 'Publicar Insumo'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
