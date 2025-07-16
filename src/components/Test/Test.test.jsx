import { render, screen, fireEvent } from '@testing-library/react';
import Test from './Test';
import { test, expect } from '@jest/globals';

test('cambia la imagen y el texto al hacer clic en el botón', () => {
  render(<Test />);

  const button = screen.getByRole('button', { name: /haz clic para cambiar la imagen/i });
  const statusText = screen.getByText(/el estado actual es: cerrado \(false\)/i);
  const image = screen.getByAltText('Icono de prueba');

  // Estado inicial
  expect(statusText).toBeInTheDocument();
  expect(image.src).toContain('test-file-stub');

  // Haz clic en el botón
  fireEvent.click(button);

  // Estado cambiado
  expect(screen.getByText(/el estado actual es: abierto \(true\)/i)).toBeInTheDocument();
  expect(image.src).toContain('cerrar.png');
});