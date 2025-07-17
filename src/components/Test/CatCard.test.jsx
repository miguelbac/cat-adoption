/* eslint-env jest */  // Indica a ESLint que este archivo usa entorno Jest para evitar errores de variables no definidas
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CatCard from '../CatCard/CatCard';  // Importamos el componente a testear
import * as favService from '../../services/favouritesService';  // Importamos el servicio para espiar funciones

// Mock de react-toastify para evitar que se muestren notificaciones reales durante los tests
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),  // Creamos funciones mock para los métodos success e info
    info: jest.fn(),
  },
}));

// Agrupamos las pruebas con describe para organizar el test suite del componente CatCard
describe('CatCard component', () => {
  // Datos de ejemplo que usaremos para probar el componente
  const catDataMock = {
    id: '123',
    width: 200,
    height: 200,
    breed: 'Siamese',
  };

  const imageMock = 'https://placekitten.com/200/300';
  const nameMock = 'Mittens';

  // beforeEach se ejecuta antes de cada test para preparar el entorno
  beforeEach(() => {
    // Espiamos (spyOn) las funciones del servicio para controlar su comportamiento durante el test
    jest.spyOn(favService, 'isFavorite').mockReturnValue(false); // isFavorite devolverá siempre false
    jest.spyOn(favService, 'toggleFavorite').mockReturnValue(true); // toggleFavorite devolverá true
  });

  // afterEach se ejecuta después de cada test para limpiar mocks y evitar efectos colaterales
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Primer test: verificar que el componente muestra correctamente la info básica
  test('muestra la información básica correctamente', () => {
    render(<CatCard image={imageMock} name={nameMock} catData={catDataMock} />);

    // Comprobamos que la imagen se renderiza con el alt correcto
    const img = screen.getByAltText(`Foto de ${nameMock}`);
    expect(img).toBeInTheDocument();  // Verificamos que existe en el DOM
    expect(img).toHaveAttribute('src', imageMock);  // Verificamos que tiene el src correcto

    // Comprobamos que el nombre del gato aparece en pantalla
    expect(screen.getByText(nameMock)).toBeInTheDocument();

    // El icono favorito inicial debe ser "No favorito" (porque isFavorite devuelve false)
    const favIcon = screen.getByAltText('No favorito');
    expect(favIcon).toBeInTheDocument();
  });

  // Segundo test: verificar que al hacer click se cambia el estado favorito y se llaman las funciones adecuadas
  test('cambia el estado de favorito y llama a toggleFavorite al hacer clic', () => {
    // Creamos un mock para la función que se pasa por props y se llama al cambiar favorito
    const onToggleFavoriteMock = jest.fn();

    render(
      <CatCard
        image={imageMock}
        name={nameMock}
        catData={catDataMock}
        onToggleFavorite={onToggleFavoriteMock}
      />
    );

    // Comprobamos el icono de favorito antes del clic (debe estar en "No favorito")
    const favIconBefore = screen.getByAltText('No favorito');
    expect(favIconBefore).toBeInTheDocument();

    // Simulamos un clic en el icono favorito
    fireEvent.click(favIconBefore);

    // Verificamos que la función toggleFavorite del servicio se haya llamado
    expect(favService.toggleFavorite).toHaveBeenCalled();

    // Verificamos que la función onToggleFavorite que viene del padre también se haya llamado
    expect(onToggleFavoriteMock).toHaveBeenCalled();

    // Después del toggle, el icono favorito debe cambiar a "Favorito"
    const favIconAfter = screen.getByAltText('Favorito');
    expect(favIconAfter).toBeInTheDocument();
  });
});