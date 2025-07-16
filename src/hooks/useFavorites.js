// hooks/useFavorites.js
import { useReducer, useEffect } from 'react';

// Acciones del reducer
const ACTIONS = {
  LOAD_FAVORITES: 'LOAD_FAVORITES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES'
};

// Estado inicial
const initialState = {
  favorites: [],
  loading: true,
  error: null
};

// Reducer
function favoritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        loading: false,
        error: null
      };

    case ACTIONS.ADD_FAVORITE:
      const isAlreadyFavorite = state.favorites.some(fav => fav.id === action.payload.id);
      if (isAlreadyFavorite) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        error: null
      };

    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
        error: null
      };

    case ACTIONS.TOGGLE_FAVORITE:
      const existingFavorite = state.favorites.find(fav => fav.id === action.payload.id);
      if (existingFavorite) {
        // Remover de favoritos
        return {
          ...state,
          favorites: state.favorites.filter(fav => fav.id !== action.payload.id),
          error: null
        };
      } else {
        // Agregar a favoritos
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
          error: null
        };
      }

    case ACTIONS.CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
        error: null
      };

    default:
      return state;
  }
}

// Hook personalizado
export function useFavorites() {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Cargar favoritos al inicializar
  useEffect(() => {
    loadFavorites();
  }, []);

  // Sincronizar con localStorage cada vez que cambien los favoritos
  useEffect(() => {
    // Solo sincronizar si no estamos en el estado inicial (después de cargar)
    if (state.favorites.length > 0 || 
        (state.favorites.length === 0 && !state.loading)) {
      try {
        localStorage.setItem('catFavorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error al guardar favoritos:', error);
      }
    }
  }, [state.favorites, state.loading]);

  // Funciones de acción
  const loadFavorites = () => {
    try {
      const favorites = localStorage.getItem('catFavorites');
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];
      dispatch({ type: ACTIONS.LOAD_FAVORITES, payload: parsedFavorites });
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      dispatch({ type: ACTIONS.LOAD_FAVORITES, payload: [] });
    }
  };

  const addToFavorites = (cat) => {
    try {
      dispatch({ type: ACTIONS.ADD_FAVORITE, payload: cat });
      
      // Actualizar localStorage inmediatamente
      const updatedFavorites = [...state.favorites, cat];
      localStorage.setItem('catFavorites', JSON.stringify(updatedFavorites));
      
      return true;
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      return false;
    }
  };

  const removeFromFavorites = (catId) => {
    try {
      dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: catId });
      
      // Actualizar localStorage inmediatamente
      const updatedFavorites = state.favorites.filter(fav => fav.id !== catId);
      localStorage.setItem('catFavorites', JSON.stringify(updatedFavorites));
      
      return true;
    } catch (error) {
      console.error('Error al remover de favoritos:', error);
      return false;
    }
  };

  const toggleFavorite = (cat) => {
    try {
      const wasAlreadyFavorite = state.favorites.some(fav => fav.id === cat.id);
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: cat });
      
      // Actualizar localStorage inmediatamente
      const updatedFavorites = wasAlreadyFavorite 
        ? state.favorites.filter(fav => fav.id !== cat.id)
        : [...state.favorites, cat];
      
      localStorage.setItem('catFavorites', JSON.stringify(updatedFavorites));
      
      return !wasAlreadyFavorite; // Retorna el nuevo estado
    } catch (error) {
      console.error('Error al alternar favorito:', error);
      return false;
    }
  };

  const clearFavorites = () => {
    try {
      dispatch({ type: ACTIONS.CLEAR_FAVORITES });
      localStorage.removeItem('catFavorites');
      return true;
    } catch (error) {
      console.error('Error al limpiar favoritos:', error);
      return false;
    }
  };

  const isFavorite = (catId) => {
    return state.favorites.some(fav => fav.id === catId);
  };

  const getFavorites = () => {
    return state.favorites;
  };

  return {
    favorites: state.favorites,
    loading: state.loading,
    error: state.error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    getFavorites
  };
}