import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ImageDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return (
      <div style={{ padding: '2rem', color: '#fff', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <p>No image details found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const datum = item.data[0];
  const imageUrl = item.links ? item.links[0].href : '';

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem', cursor: 'pointer' }}
      >
        &larr; Back
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <img src={imageUrl} alt={datum.title} style={{ width: '100%', borderRadius: '12px' }} />
        <h1 style={{ marginTop: '1.5rem', color: '#4da6ff' }}>{datum.title}</h1>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          Date Created: {new Date(datum.date_created).toLocaleDateString()} | NASA ID: {datum.nasa_id}
        </p>
        <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{datum.description}</p>
        
        <a 
          href={imageUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          download
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0066cc',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px'
          }}
        >
          Download Image
        </a>
      </div>
    </div>
  );
}