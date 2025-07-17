import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import ThemeProvider from './context/ThemeProvider';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage/HomePage';
import AdoptPage from './pages/AdoptPage/AdoptPage';
import MapPage from './pages/MapPage/MapPage';
import FavPage from './pages/FavPage/FavPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="adopt" element={<AdoptPage />} />
          <Route path="mapa" element={<MapPage />} />
          <Route path="fav" element={<FavPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
}

export default App;