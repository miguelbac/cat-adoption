import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mapa" />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;