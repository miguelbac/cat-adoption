// catService.js
const API_KEY = 'live_gRqlPV9KGHAT7RLKkmVcPfhpRUwVJHHhhFqRoEnukJiAjVE5DCdPuFUesNm31HgI';
const BASE_URL = 'https://api.thecatapi.com/v1';

// Nombres aleatorios para los gatos
const catNames = [
  'Tucker', 'Zoey', 'Coco', 'Penny', 'Lola', 'Ruby', 'Lily', 'Rosie',
  'Pelusa', 'Bigotes', 'Manchitas', 'Copito', 'Chispa', 'Michu', 'Nube', 'Galleta',
  'Calcetines', 'Ronroneo', 'Trueno', 'Canela', 'Mota', 'Tigre', 'Blanquito',
  'Negri', 'Pantera', 'Bolita', 'Mimi', 'Sol', 'Luz', 'Bruma', 'Niebla',
  'Zarpas', 'Rayas', 'Gato', 'Minino', 'Gordi', 'Ronnie', 'Tom', 'Jerry',
  'Peanut', 'Pumpkin', 'Midnight', 'Snowball', 'Salem', 'Boo', 'Pepper',
  'Stormy', 'Ash', 'Bandit', 'Boots', 'Gizmo', 'Cinnamon', 'Maple', 'Olive',
  'Jasper', 'Oscar', 'Harley', 'Theo', 'Sam', 'Freya', 'Willow', 'Sasha',
  'Cleo', 'Toby', 'Milo', 'Leo', 'Binx', 'Churro', 'Taco', 'Nacho', 'Croqueta',
  'Albóndiga', 'Quesito', 'Caramelo', 'Bombón', 'Chocolate', 'Miel',
  'Bizcocho', 'Panqueque', 'Galletita', 'Flan', 'Pelusín', 'Zanahorio',
  'Mostachón', 'Babú', 'Totoro', 'Ninfa', 'Bola de Nieve', 'Chisguete',
  'Ronroncio', 'Don Gato', 'Doña Michi'
];

// Función para obtener un nombre aleatorio
function getRandomName() {
  const randomIndex = Math.floor(Math.random() * catNames.length);
  return catNames[randomIndex];
}

// Función principal para obtener gatos
export async function fetchCats(limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/images/search?limit=${limit}&api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transformar los datos para que coincidan con la estructura esperada
    return data.map((cat) => ({
      id: cat.id,
      image: cat.url,
      name: getRandomName(),
      width: cat.width,
      height: cat.height
    }));
  } catch (error) {
    console.error('Error al obtener gatos:', error);
    
    // Datos de fallback en caso de error
    return [
      {
        id: 'fallback-1',
        image: 'https://placekitten.com/200/200',
        name: 'Whiskers'
      },
      {
        id: 'fallback-2',
        image: 'https://placekitten.com/201/201',
        name: 'Mittens'
      },
      {
        id: 'fallback-3',
        image: 'https://placekitten.com/202/202',
        name: 'Shadow'
      },
      {
        id: 'fallback-4',
        image: 'https://placekitten.com/203/203',
        name: 'Luna'
      },
      {
        id: 'fallback-5',
        image: 'https://placekitten.com/204/204',
        name: 'Felix'
      }
    ];
  }
}

// Función adicional para obtener un gato específico por ID
export async function fetchCatById(catId) {
  try {
    const response = await fetch(`${BASE_URL}/images/${catId}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const cat = await response.json();
    
    return {
      id: cat.id,
      image: cat.url,
      name: getRandomName(),
      width: cat.width,
      height: cat.height
    };
  } catch (error) {
    console.error('Error al obtener gato por ID:', error);
    return null;
  }
}

// Función para obtener gatos por raza (opcional)
export async function fetchCatsByBreed(breedId, limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}&api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map(cat => ({
      id: cat.id,
      image: cat.url,
      name: getRandomName(),
      width: cat.width,
      height: cat.height,
      breed: cat.breeds?.[0]?.name || 'Mestizo'
    }));
  } catch (error) {
    console.error('Error al obtener gatos por raza:', error);
    return [];
  }
}