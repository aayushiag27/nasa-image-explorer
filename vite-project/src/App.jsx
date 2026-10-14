import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NasaProvider } from './context/NasaContext';
import Home from './pages/Home';
import ImageDetail from './pages/ImageDetail';

export default function App() {
  return (
    <NasaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:nasaId" element={<ImageDetail />} />
        </Routes>
      </Router>
    </NasaProvider>
  );
}