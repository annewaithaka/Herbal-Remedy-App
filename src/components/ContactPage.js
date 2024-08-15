import './ContactPage.css';
import contactImage from '../assets/contact.jpg';

function ContactPage() {
  return (
    <div className="contact-page" style={{ backgroundImage: `url(${contactImage})` }}>
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We are here to assist you. Reach out to us through any of the following means:</p>
        <ul>
          <li>Phone: 123-456-7890</li>
          <li>Email: contact@company.com</li>
          <li>Visit our store</li>
        </ul>
      </div>
    </div>
  );
}

export default ContactPage;
