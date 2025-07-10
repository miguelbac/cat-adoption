import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage/MapPage';
import HomePage from './pages/HomePage/HomePage';
import AdoptPage from './pages/AdoptPage/AdoptPage';
import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Test from './components/Test/Test'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
       {/* Aquí es donde irán las páginas que se mostrarán en el <Outlet/> */}
        {/* <Route index element={<HomePage />} />
        <Route path="adopt" element={<AdoptPage />} /> */}
      
      </Route>
      </Routes>
  );
}

export default App