import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/storage';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Check } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas');
  const { addToCart, cartItems } = useCart();
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    // Solo cargamos productos activos
    const all = getProducts();
    setProducts(all.filter(p => p.status === 'active'));
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
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Catálogo Médico</h2>
          <p style={{ color: 'var(--text-muted)' }}>Insumos verificados para tu clínica</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px' }}>
          <div className="form-group" style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar producto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <select 
            className="form-control" 
            style={{ width: '150px' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-catalog">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card glass-panel">
            <div className="product-img-container">
              <img src={product.imageUrl} alt={product.name} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span className="badge badge-primary">{product.category}</span>
              </div>
            </div>
            
            <div className="product-info">
              <h3 style={{ fontSize: '1.125rem' }}>{product.name}</h3>
              <p className="product-provider">Proveedor ID: {product.providerId}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1 }}>
                {product.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="product-price">${product.price.toFixed(2)}</span>
                
                <button 
                  className={`btn ${addedItems[product.id] ? 'btn-success' : 'btn-primary'}`} 
                  onClick={() => handleAddToCart(product)}
                  style={addedItems[product.id] ? { background: 'var(--accent-success)' } : {}}
                >
                  {addedItems[product.id] ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {addedItems[product.id] ? 'Añadido' : 'Agregar'}
                  {getCartQuantity(product.id) > 0 && !addedItems[product.id] && (
                    <span style={{ marginLeft: '4px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                      {getCartQuantity(product.id)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No se encontraron productos compatibles con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
