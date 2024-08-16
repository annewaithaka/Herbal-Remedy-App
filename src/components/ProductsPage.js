import React, { useEffect, useState } from 'react';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/herbs')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="products-page">
      {products.map(product => (
        <div key={product.id} className="product-info">
          <img src={product.image} alt={product.name} />
          <div>
            <h2>{product.name}</h2>
            <p>{product.advantages.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
