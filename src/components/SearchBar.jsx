// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <input
        type='text'
        placeholder='Cari produk...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          border: '1px solid #ddd',
          borderRadius: '6px',
          outline: 'none',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#1B4F72')}
        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
      />
    </div>
  );
}
