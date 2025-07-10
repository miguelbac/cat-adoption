import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdoptPage from './pages/AdoptPage/AdoptPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/adoptar" />} />
        <Route path="/adoptar" element={<AdoptPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
