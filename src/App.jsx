
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';
import HomePage from './pages/HomePage/HomePage';
import AdoptPage from './pages/AdoptPage/AdoptPage';
import Layout from './components/Layout/Layout';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="adopt" element={<AdoptPage />} />
          <Route path="mapa" element={<MapPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;