// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#1B4F72', marginBottom: '1rem' }}>Keranjang Kosong</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>Belum ada produk di keranjang Anda.</p>
        <Link
          to='/'
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem', background: '#1B4F72',
            color: 'white', borderRadius: '6px', textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#1B4F72' }}>Keranjang Belanja</h2>

      {items.map((item) => (
        <div key={item.id} style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          padding: '1.25rem', borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          marginBottom: '0.5rem',
          borderRadius: '6px',
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '70px', height: '70px', objectFit: 'contain', flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', color: '#333' }}>{item.title}</h4>
            <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>${item.price.toFixed(2)}</p>
          </div>

          {/* Tombol Update Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              style={{
                width: '32px', height: '32px', background: '#EBF5FB',
                color: '#1B4F72', border: '1px solid #1B4F72',
                borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem',
                fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0, lineHeight: 1,
              }}
            >
              −
            </button>
            <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{
                width: '32px', height: '32px', background: '#1B4F72',
                color: 'white', border: 'none',
                borderRadius: '4px', cursor: 'pointer', fontSize: '1.2rem',
                fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0, lineHeight: 1,
              }}
            >
              +
            </button>
          </div>

          <p style={{ fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeItem(item.id)}
            style={{
              background: '#e74c3c', color: 'white',
              border: 'none', padding: '0.5rem 0.75rem', borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Hapus
          </button>
        </div>
      ))}

      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid #e0e0e0', textAlign: 'right' }}>
        <h3 style={{ color: '#1B4F72', fontSize: '1.3rem', margin: '0 0 1.5rem 0' }}>Total: ${totalPrice.toFixed(2)}</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={clearCart}
            style={{
              padding: '0.75rem 1.5rem', background: '#e74c3c',
              color: 'white', border: 'none', borderRadius: '4px',
              fontSize: '1rem', cursor: 'pointer',
            }}
          >
            Kosongkan Keranjang
          </button>
          <button
            onClick={() => alert('Checkout berhasil!')}
            style={{
              padding: '0.75rem 2rem', background: '#27AE60',
              color: 'white', border: 'none', borderRadius: '4px',
              fontSize: '1rem', cursor: 'pointer',
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
