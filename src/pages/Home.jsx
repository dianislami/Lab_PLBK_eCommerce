// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h2 style={{ color: '#1B4F72', marginBottom: '1.5rem' }}>Katalog Produk</h2>

      {/* Search Bar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filter Kategori */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.5rem 1rem',
            background: selectedCategory === 'all' ? '#1B4F72' : '#ffffff',
            color: selectedCategory === 'all' ? 'white' : '#333',
            border: selectedCategory === 'all' ? 'none' : '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s',
          }}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              background: selectedCategory === cat ? '#1B4F72' : '#ffffff',
              color: selectedCategory === cat ? 'white' : '#333',
              border: selectedCategory === cat ? 'none' : '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              textTransform: 'capitalize',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      {filteredProducts.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center', marginTop: '3rem', fontSize: '1.1rem' }}>
          Produk tidak ditemukan.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
          rowGap: '3.5rem',
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
