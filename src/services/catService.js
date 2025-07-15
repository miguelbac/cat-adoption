const API_KEY = 'live_gRqlPV9KGHAT7RLKkmVcPfhpRUwVJHHhhFqRoEnukJiAjVE5DCdPuFUesNm31HgI';
const BASE_URL = 'https://api.thecatapi.com/v1';

const catNames = [  'Whiskers', 'Mittens', 'Shadow', 'Luna', 'Simba', 'Nala', 'Felix', 'Garfield',
  'Tigger', 'Smokey', 'Oreo', 'Mochi', 'Chloe', 'Bella', 'Max', 'Charlie',
  'Lucy', 'Molly', 'Buddy', 'Daisy', 'Rocky', 'Sadie', 'Tucker', 'Zoey',
  'Coco', 'Penny', 'Lola', 'Ruby', 'Lily', 'Rosie',
  'Pelusa', 'Bigotes', 'Manchitas', 'Copito', 'Chispa', 'Michu', 'Nube', 'Galleta',
  'Calcetines', 'Ronroneo', 'Trueno', 'Canela', 'Mota', 'Tigre', 'Blanquito',
  'Negri', 'Pantera', 'Chispa', 'Bolita', 'Mimi', 'Sol', 'Luz', 'Bruma',
  'Niebla', 'Zarpas', 'Rayas', 'Gato', 'Minino', 'Gordi', 'Ronnie',
  'Tom', 'Jerry', 'Peanut', 'Pumpkin', 'Midnight', 'Snowball', 'Salem', 'Boo',
  'Pepper', 'Stormy', 'Ash', 'Bandit', 'Boots', 'Gizmo', 'Cinnamon', 'Maple',
  'Olive', 'Jasper', 'Oscar', 'Harley', 'Theo', 'Sam', 'Freya', 'Willow',
  'Sasha', 'Cleo', 'Toby', 'Milo', 'Leo', 'Binx',
  'Churro', 'Taco', 'Nacho', 'Croqueta', 'Albóndiga', 'Quesito', 'Caramelo',
  'Bombón', 'Chocolate', 'Miel', 'Bizcocho', 'Panqueque', 'Galletita', 'Flan',
  'Pelusín', 'Zanahorio', 'Mostachón', 'Babú', 'Totoro', 'Ninfa', 'Bola de Nieve',
  'Chisguete', 'Ronroncio', 'Don Gato', 'Doña Michi'
];

function getRandomName() {
  const randomIndex = Math.floor(Math.random() * catNames.length);
  return catNames[randomIndex];
}

export async function fetchCats(limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/images/search?limit=${limit}&api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.map((cat) => ({
      id: cat.id,
      image: cat.url,
      name: getRandomName(),
      width: cat.width,
      height: cat.height,
      breed: 'Mestizo' // Añadido para evitar errores en CatCard
    }));
  } catch (error) {
    console.error('Error al obtener gatos:', error);
    return [
      {
        id: 'fallback-1',
        image: 'https://placekitten.com/200/200',
        name: 'Whiskers',
        width: 200,
        height: 200,
        breed: 'Mestizo'
      },
      {
        id: 'fallback-2',
        image: 'https://placekitten.com/201/201',
        name: 'Mittens',
        width: 201,
        height: 201,
        breed: 'Mestizo'
      },
      {
        id: 'fallback-3',
        image: 'https://placekitten.com/202/202',
        name: 'Shadow',
        width: 202,
        height: 202,
        breed: 'Mestizo'
      }
    ];
  }
}

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
      height: cat.height,
      breed: 'Mestizo'
    };
  } catch (error) {
    console.error('Error al obtener gato por ID:', error);
    return null;
  }
}

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
