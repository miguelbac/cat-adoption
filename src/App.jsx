import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';
import HomePage from './pages/HomePage/HomePage';
import AdoptPage from './pages/AdoptPage/AdoptPage';

function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<HomePage />} />

        {/* Página de adopción */}
        <Route path="/adopt" element={<AdoptPage />} />

        {/* Página de mapa/contacto */}
        <Route path="/mapa" element={<MapPage />} />

        {/* Rutas no definidas: redirige a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    <Footer></Footer>
    </>
  )
}

export default App