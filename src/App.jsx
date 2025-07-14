import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';
import HomePage from './pages/HomePage/HomePage';
import AdoptPage from './pages/AdoptPage/AdoptPage';
import FavPage from './pages/FavPage/FavPage';
import Layout from './components/Layout/Layout';
import Test from './components/Test/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="adopt" element={<AdoptPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="fav" element={<FavPage />} />

      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;