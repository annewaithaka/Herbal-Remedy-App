import React from 'react';
import './HerbCard.css';

// Import images
import tumericImg from '../assets/tumeric.jpg';
import gingerImg from '../assets/ginger.jpg';
// Import other images...

// Map filenames to images
const images = {
  "tumeric.jpg": tumericImg,
  "ginger.jpg": gingerImg,
  // Map other image filenames...
};

function HerbCard({ herb }) {
  const imageSrc = images[herb.image] || null;

  return (
    <div className="herb-card">
      {imageSrc && <img src={imageSrc} alt={herb.name} className="herb-image" />}
      <h3>{herb.name}</h3>
      <ul>
        {herb.advantages.map((advantage, index) => (
          <li key={index}>{advantage}</li>
        ))}
      </ul>
    </div>
  );
}

export default HerbCard;
