import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert('Simulación: Compra realizada con éxito. La trazabilidad ha sido asegurada y los proveedores notificados.');
    clearCart();
    navigate('/catalog');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1100px', width: '100%' }}>
      <div>
        <h2 style={{ marginBottom: '0.5rem' }}>Carrito de Insumos</h2>
        <p className="caption">Revisa tus productos antes de finalizar la compra segura.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', marginBottom: '1rem' }}>
            <ShoppingCart size={32} color="var(--text-muted)" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '1.5rem' }}>No has seleccionado ningún insumo médico aún.</p>
          <button className="btn btn-primary" onClick={() => navigate('/catalog')}>
            Explorar el Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Main Cart Items */}
          <div className="glass-panel" style={{ flex: '1 1 650px', padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    <th style={{ paddingLeft: '1.5rem' }}>Producto Verificado</th>
                    <th style={{ textAlign: 'right' }}>Precio Unit.</th>
                    <th style={{ textAlign: 'center' }}>Cantidad</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                    <th style={{ width: '60px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td style={{ paddingLeft: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                             <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{product.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                               <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Certificado</span>
                               <span className="caption" style={{ fontSize: '0.75rem' }}>ID: {product.providerId}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="num-data" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>${product.price.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', width: 'max-content', margin: '0 auto' }}>
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="btn btn-ghost"
                            style={{ padding: '0.25rem' }}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="num-data" style={{ width: '24px', textAlign: 'center' }}>{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="btn btn-ghost"
                            style={{ padding: '0.25rem', color: 'var(--primary)' }}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="num-data" style={{ fontWeight: 600, textAlign: 'right' }}>${(product.price * quantity).toFixed(2)}</td>
                      <td style={{ paddingRight: '1.5rem' }}>
                        <button 
                          onClick={() => removeFromCart(product.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.4rem', borderRadius: 'var(--radius-md)' }}
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ padding: '1rem 1.5rem', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success)' }}>
               <ShieldCheck size={20} />
               <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Todos los productos de este carrito cuentan con trazabilidad aprobada.</span>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="glass-panel" style={{ flex: '1 1 320px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '96px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Resumen Clínico</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="caption">Subtotal de insumos ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="num-data">${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="caption">Impuestos (19%)</span>
                <span className="num-data">${(cartTotal * 0.19).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="caption">Envío sanitario estándar</span>
                <span className="num-data" style={{ color: 'var(--success)' }}>Gratis</span>
              </div>
            </div>
            
            <div style={{ height: '1px', background: 'var(--border-glass)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Total Final</span>
              <span className="num-data text-gradient" style={{ fontSize: '1.75rem', fontWeight: 700 }}>${(cartTotal * 1.19).toFixed(2)}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', fontSize: '1rem' }} onClick={handleCheckout}>
              Procesar Pedido Seguro <ArrowRight size={20} />
            </button>
            
            <p className="caption" style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem', opacity: 0.7 }}>
              Transacción encriptada end-to-end. Los proveedores recibirán una nota ciega de despacho.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
