import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageCard({ item }) {
  const navigate = useNavigate();
  const datum = item.data[0];
  const imageUrl = item.links ? item.links[0].href : '';

  return (
    <div 
      onClick={() => navigate(`/detail/${datum.nasa_id}`, { state: { item } })}
      style={{
        border: '1px solid #333',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#111',
        color: '#fff',
        padding: '1rem'
      }}
    >
      <img 
        src={imageUrl} 
        alt={datum.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3 style={{ fontSize: '1rem', marginTop: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {datum.title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#888' }}>
        {new Date(datum.date_created).toLocaleDateString()}
      </p>
    </div>
  );
}