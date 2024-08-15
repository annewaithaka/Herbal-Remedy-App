import './ProductsPage.css';
import productImage from '../assets/product.jpg';

function ProductsPage() {
  return (
    <div className="products-page">
      <img src={productImage} alt="Product" />
      <div className="product-info">
        <h2>Product Name</h2>
        <p>Description of the product</p>
      </div>
    </div>
  );
}

export default ProductsPage;
