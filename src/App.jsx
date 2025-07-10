import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Test from './components/Test/Test'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';

function App() {

  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/mapa" />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    <Footer></Footer>
    </>
  )
}

export default App