import React, { createContext, useState, useEffect } from 'react';

export const NasaContext = createContext();

const BASE_URL = 'https://images-api.nasa.gov';

// API functions directly inside context file to avoid import issues
const fetchDefaultImages = async () => {
  const response = await fetch(`${BASE_URL}/search?q=space&page=1`);
  const data = await response.json();
  return data.collection.items;
};

const searchImagesApi = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`);
  const data = await response.json();
  return data.collection;
};

export const NasaProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadDefaults = async () => {
      setLoading(true);
      try {
        const items = await fetchDefaultImages();
        setImages(items);
      } catch (err) {
        setError('Failed to fetch default images.');
      } finally {
        setLoading(false);
      }
    };
    loadDefaults();
  }, []);

  const handleSearch = async (searchQuery, pageNum = 1) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const collection = await searchImagesApi(searchQuery, pageNum);
      setImages(collection.items);
      const totalHits = collection.metadata?.total_hits || 0;
      setTotalPages(Math.ceil(totalHits / 100));
    } catch (err) {
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NasaContext.Provider
      value={{
        images,
        loading,
        error,
        query,
        setQuery,
        page,
        setPage,
        totalPages,
        handleSearch,
      }}
    >
      {children}
    </NasaContext.Provider>
  );
};