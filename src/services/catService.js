const API_KEY = "live_gRqlPV9KGHAT7RLKkmVcPfhpRUwVJHHhhFqRoEnukJiAjVE5DCdPuFUesNm31HgI";

export async function fetchCats(limit = 15) {
  try {
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    const data = await res.json();

    return data.map((cat, i) => ({
      id: cat.id,
      image: cat.url,
      name: `Gato ${i + 1}`,
    }));
  } catch (error) {
    console.error("Error al obtener gatos:", error);
    return [];
  }
}
