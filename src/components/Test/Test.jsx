// src/components/Test/Test.jsx

import { useState } from 'react';
import menuButton from '../../assets/hmenu.png';
import closeIcon from '../../assets/cerrar.png';

const Test = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div style={{ padding: '50px', backgroundColor: 'lightgray', textAlign: 'center' }}>
      <h2>Componente de Prueba</h2>
      <button onClick={() => setIsToggled(!isToggled)} style={{ padding: '10px', marginBottom: '20px' }}>
        Haz clic para cambiar la imagen
      </button>
      <hr />
      <p>La imagen debería cambiar aquí abajo:</p>
      <img
        src={isToggled ? closeIcon : menuButton}
        alt="Icono de prueba"
        style={{ width: '100px', border: '2px solid red' }}
      />
      <p style={{ fontWeight: 'bold' }}>El estado actual es: {isToggled ? 'Abierto (true)' : 'Cerrado (false)'}</p>
    </div>
  );
};

export default Test;