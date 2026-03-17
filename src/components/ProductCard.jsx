// src/components/ProductCard.jsx
// Komponen reusable untuk menampilkan produk
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '0.5rem' }}
      />
      <h3 style={{ fontSize: '0.95rem', margin: '0.5rem 0', flex: 1, color: '#333' }}>
        {product.title.substring(0, 50)}...
      </h3>
      <p style={{ fontWeight: 'bold', color: '#E67E22', fontSize: '1.2rem', margin: '0.5rem 0' }}>
        ${product.price.toFixed(2)}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
        <Link
          to={`/product/${product.id}`}
          style={{
            flex: 1, padding: '0.6rem', textAlign: 'center',
            background: '#ffffff', color: '#1B4F72',
            border: '1px solid #1B4F72',
            borderRadius: '6px', textDecoration: 'none', fontWeight: '500',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#1B4F72';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#ffffff';
            e.target.style.color = '#1B4F72';
          }}
        >
          Detail
        </Link>
        <button
          onClick={() => addItem(product)}
          style={{
            flex: 1, padding: '0.6rem', background: '#1B4F72',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontWeight: '500', transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.background = '#173a52'}
          onMouseLeave={(e) => e.target.style.background = '#1B4F72'}
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}
