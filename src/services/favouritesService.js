// favoritesService.js
const FAVORITES_KEY = 'catFavorites';

// Obtener todos los favoritos del localStorage
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }
}

// Agregar un gato a favoritos
export function addToFavorites(cat) {
  try {
    const favorites = getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.id === cat.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, cat];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    return false;
  }
}

// Remover un gato de favoritos
export function removeFromFavorites(catId) {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== catId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error al remover de favoritos:', error);
    return false;
  }
}

// Verificar si un gato está en favoritos
export function isFavorite(catId) {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === catId);
  } catch (error) {
    console.error('Error al verificar favorito:', error);
    return false;
  }
}

// Alternar estado de favorito
export function toggleFavorite(cat) {
  try {
    if (isFavorite(cat.id)) {
      removeFromFavorites(cat.id);
      return false;
    } else {
      addToFavorites(cat);
      return true;
    }
  } catch (error) {
    console.error('Error al alternar favorito:', error);
    return false;
  }
}

// Limpiar todos los favoritos
export function clearFavorites() {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar favoritos:', error);
    return false;
  }
}