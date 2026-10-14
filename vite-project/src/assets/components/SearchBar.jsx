import React, { useState, useEffect, useContext } from 'react';
import { NasaContext } from '../context/NasaContext';

export default function SearchBar() {
  const { handleSearch, query, setQuery } = useContext(NasaContext);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        setQuery(searchTerm);
        handleSearch(searchTerm, 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search space, planets, nebulae..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '80%',
          maxWidth: '500px',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px solid #444',
          backgroundColor: '#222',
          color: '#fff',
          fontSize: '1rem'
        }}
      />
    </div>
  );
}