import React, { useEffect, useState } from "react";
import CatCard from "../CatCard/CatCard";
import { fetchCats } from "../../services/catService";
import "./CatSlider.css";

function CatSlider() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function loadCats() {
      const catsData = await fetchCats(10);
      setCats(catsData);
    }

    loadCats();
  }, []);

  return (
    <div className="cat-slider">
      {cats.map((cat) => (
        <CatCard key={cat.id} image={cat.image} name={cat.name} />
      ))}
    </div>
  );
}

export default CatSlider;
