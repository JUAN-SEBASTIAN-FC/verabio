import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Package as PackageIcon } from 'lucide-react';

const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', category: '', description: '', price: '', imageUrl: '', status: 'active' });

  useEffect(() => {
    // Solo mostramos productos que le pertenecen a este proveedor
    setProducts(getProducts().filter(p => p.providerId === currentUser.id));
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allProducts = getProducts();
    let updatedProducts;

    if (formData.id) {
      // Edit
      updatedProducts = allProducts.map(p => p.id === formData.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p);
    } else {
      // Create
      const newProduct = {
        ...formData,
        id: `prod_${Date.now()}`,
        providerId: currentUser.id,
        price: parseFloat(formData.price),
        reviews: []
      };
      updatedProducts = [...allProducts, newProduct];
    }
    
    saveProducts(updatedProducts);
    setProducts(updatedProducts.filter(p => p.providerId === currentUser.id));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
      const allProducts = getProducts();
      const updatedProducts = allProducts.filter(p => p.id !== id);
      saveProducts(updatedProducts);
      setProducts(updatedProducts.filter(p => p.providerId === currentUser.id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Mis Productos</h2>
          <p style={{ color: 'var(--text-muted)' }}>Gestión de inventario y catálogo activo</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setFormData({ id: '', name: '', category: '', description: '', price: '', imageUrl: '', status: 'active' }); setShowModal(true); }}
        >
          <Plus size={18} /> Nuevo Insumo
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <PackageIcon size={48} style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
            <p>Aún no has registrado ningún producto.</p>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.imageUrl} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {product.status === 'active' ? 'Stock Disponible' : 'Agotado'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => { setFormData({...product}); setShowModal(true); }}
                          className="btn btn-glass" style={{ padding: '0.25rem 0.5rem' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger-glass" style={{ padding: '0.25rem 0.5rem' }}
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{formData.id ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Nombre del producto</label>
                <input required type="text" className="form-control" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Categoría</label>
                  <input required type="text" className="form-control" name="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Ej: Laboratorio, Estética..." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Precio ($)</label>
                  <input required type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descripción Técnica</label>
                <textarea required className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">URL de la Imagen</label>
                <input required type="url" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label className="form-label">Estado de Inventario</label>
                <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="active">Disponible (Activo)</option>
                  <option value="out_of_stock">Agotado</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{formData.id ? 'Guardar Cambios' : 'Añadir Producto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
