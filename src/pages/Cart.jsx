import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert('Simulación: Compra realizada con éxito. Los proveedores han sido notificados.');
    clearCart();
    navigate('/catalog');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div>
        <h2>Tu Carrito de Insumos</h2>
        <p style={{ color: 'var(--text-muted)' }}>Revisa tus productos antes de finalizar la compra</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No hay productos en el carrito.</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/catalog')}>
            Volver al catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Lista de productos */}
          <div className="glass-panel" style={{ flex: '1 1 600px', padding: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ product, quantity }) => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        <div>
                          <p style={{ fontWeight: 500 }}>{product.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {product.providerId}</p>
                        </div>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button 
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          style={{ padding: '0.25rem', background: 'var(--bg-card)', borderRadius: '4px', color: 'white', display: 'flex' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ width: '30px', textAlign: 'center' }}>{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          style={{ padding: '0.25rem', background: 'var(--bg-card)', borderRadius: '4px', color: 'white', display: 'flex' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>${(product.price * quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        style={{ color: 'var(--accent-danger)' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen */}
          <div className="glass-panel" style={{ flex: '1 1 300px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '100px' }}>
            <h3>Resumen del Pedido</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Impuestos (19%)</span>
              <span>${(cartTotal * 0.19).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Envío</span>
              <span>Calculado en checkout</span>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600 }}>
              <span>Total Estimado</span>
              <span className="text-gradient">${(cartTotal * 1.19).toFixed(2)}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleCheckout}>
              Proceder al Pago <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
