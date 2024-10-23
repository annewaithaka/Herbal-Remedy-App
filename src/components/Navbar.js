import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/remedies">Remedies</Link></li> {/* New link */}
        <li><Link to="/signup">Sign Up</Link></li> {/* New link */}
        <li><Link to="/login">Login</Link></li> {/* New link */}
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
