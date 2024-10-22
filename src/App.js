import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import AboutUsPage from './components/AboutUsPage';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';
import Signup from './components/Signup'; // Import Signup component
import Login from './components/Login';     // Import Login component
import Remedies from './components/Remedies'; // Import Remedies component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="/remedies" element={<Remedies />} /> {/* Add Remedies route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
