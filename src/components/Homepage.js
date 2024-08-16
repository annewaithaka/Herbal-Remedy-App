import React, { useEffect, useState } from 'react';
import './Homepage.css';
import background from '../assets/background.jpg';

function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/herbs')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Limit the number of products displayed to 5
  const displayedProducts = products.slice(0, 5);

  return (
    <div className="homepage" style={{ backgroundImage: `url(${background})` }}>
      <div className="content">
        <div className="card">
          <h2>Our Best Products</h2>
          <p>Explore our wide range of quality products</p>
        </div>
        <div className="card">
          <h2>Recommended Products</h2>
          <p>We only recommend the best products for you</p>
          {/* Render a limited list of product names from db.json */}
          <ul>
            {displayedProducts.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
