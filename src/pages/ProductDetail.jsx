// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red', padding: '2rem' }}>Error: {error}</p>;
  if (!product) return null;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Tombol Kembali */}
      <Link
        to='/'
        style={{
          display: 'inline-block', marginBottom: '2rem',
          color: '#1B4F72', textDecoration: 'none', fontWeight: '500',
          fontSize: '0.95rem',
        }}
      >
        ← Kembali ke Katalog
      </Link>

      <div style={{
        display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
        background: '#ffffff', borderRadius: '8px',
        border: '1px solid #e0e0e0', padding: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}>
        {/* Gambar Produk */}
        <div style={{ flex: '0 0 280px', textAlign: 'center' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }}
          />
        </div>

        {/* Detail Produk */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <span style={{
            background: '#ffffff', color: '#1B4F72',
            padding: '0.35rem 0.9rem', borderRadius: '6px',
            fontSize: '0.8rem', textTransform: 'capitalize',
            border: '1px solid #1B4F72',
            fontWeight: '500',
            display: 'inline-block',
          }}>
            {product.category}
          </span>

          <h2 style={{ margin: '1rem 0 0.75rem', fontSize: '1.4rem', color: '#333' }}>
            {product.title}
          </h2>

          <p style={{ color: '#E67E22', fontSize: '1.8rem', fontWeight: 'bold', margin: '1rem 0' }}>
            ${product.price.toFixed(2)}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span style={{ color: '#f39c12', fontSize: '1rem' }}>★</span>
            <span style={{ color: '#666', fontSize: '0.95rem' }}>
              {product.rating?.rate} / 5 ({product.rating?.count} ulasan)
            </span>
          </div>

          <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '2rem', fontSize: '0.95rem' }}>
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            style={{
              padding: '0.85rem 2rem',
              background: added ? '#27AE60' : '#1B4F72',
              color: 'white', border: 'none', borderRadius: '6px',
              fontSize: '1rem', cursor: 'pointer', width: '100%',
              transition: 'background 0.3s',
              fontWeight: '500',
            }}
          >
            {added ? '✓ Ditambahkan!' : '+ Tambah ke Keranjang'}
          </button>
        </div>
      </div>
    </div>
  );
}
