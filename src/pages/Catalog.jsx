import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/storage';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Check, Filter } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas');
  const { addToCart, cartItems } = useCart();
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    // Simular carga de red para mostrar skeletons
    setTimeout(() => {
      const all = getProducts();
      setProducts(all.filter(p => p.status === 'active'));
      setLoading(false);
    }, 800);
  }, []);

  const categories = ['Todas', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === 'Todas' || p.category === category;
    return matchSearch && matchCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems({ ...addedItems, [product.id]: true });
    showToast(`"${product.name}" añadido al carrito.`);
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Toast Functionality Simple
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
             <Check size={16} color="var(--success)" />
             <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{toast}</span>
          </div>
        </div>
      )}

      {/* Header del Catálogo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.5rem' }}>Catálogo <span className="text-gradient">Profesional</span></h2>
          <p className="caption">Insumos y equipos con certificación hospitalaria verificada.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px', flex: '1 1 auto' }}>
          <div className="form-group" style={{ flex: 1, position: 'relative', margin: 0 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar insumo (ej. Relleno dérmico)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
            />
          </div>
          <div style={{ position: 'relative', width: '160px' }}>
             <Filter size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
             <select 
               className="form-control" 
               style={{ cursor: 'pointer', appearance: 'none', paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)' }}
               value={category}
               onChange={(e) => setCategory(e.target.value)}
             >
               {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
          </div>
        </div>
      </div>

      {/* Grid de Productos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          // Skeletons
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-panel" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
               <div className="skeleton" style={{ height: '200px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}></div>
               <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                 <div className="skeleton" style={{ height: '24px', width: '80%' }}></div>
                 <div className="skeleton" style={{ height: '16px', width: '50%' }}></div>
                 <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton" style={{ height: '36px', width: '30%' }}></div>
                    <div className="skeleton" style={{ height: '36px', width: '40%', borderRadius: 'var(--radius-md)' }}></div>
                 </div>
               </div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const inCart = getCartQuantity(product.id) > 0;
            return (
              <div key={product.id} className="glass-panel interactive" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                    <span className="badge badge-primary">{product.category}</span>
                  </div>
                  {product.price > 100 && (
                     <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 }}>
                       <span className="badge badge-warning" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>Premium</span>
                     </div>
                  )}
                </div>
                
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', lineHeight: '1.4' }}>{product.name}</h3>
                  <p className="caption" style={{ flex: 1 }}>{product.description}</p>
                  <p className="caption" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prov: {product.providerId}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
                    <span className="num-data" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>${product.price.toFixed(2)}</span>
                    
                    <button 
                      className={`btn ${addedItems[product.id] ? 'btn-success' : 'btn-primary'}`} 
                      onClick={() => handleAddToCart(product)}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      {addedItems[product.id] ? <Check size={16} /> : <ShoppingCart size={16} />}
                      <span style={{ fontSize: '0.875rem' }}>{addedItems[product.id] ? 'Añadido' : 'Agregar'}</span>
                      {inCart && !addedItems[product.id] && (
                        <span className="num-data" style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--secondary)', color: 'white', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.65rem', border: '2px solid var(--bg-card)' }}>
                          {getCartQuantity(product.id)}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
            <Search size={48} color="var(--text-muted)" style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Sin resultados</h3>
            <p className="caption">No se encontraron productos que coincidan con "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
