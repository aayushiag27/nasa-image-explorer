import React, { useContext } from 'react';
import { NasaContext } from '../context/NasaContext';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import Loader from '../components/Loader';

export default function Home() {
  const { images, loading, error } = useContext(NasaContext);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <header style={{ textAlign: 'center' }}>
        <h1>🚀 NASA Image Explorer</h1>
        <SearchBar />
      </header>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {images.map((item) => (
            <ImageCard key={item.data[0].nasa_id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}