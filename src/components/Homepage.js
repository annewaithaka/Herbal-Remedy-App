import './Homepage.css';
import background from '../assets/background.jpg';

function Homepage() {
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
        </div>
      </div>
    </div>
  );
}

export default Homepage;
