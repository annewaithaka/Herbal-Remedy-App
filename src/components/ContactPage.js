import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './ContactPage.css';
// import storeImage from '../assets/store.jpg'; // Import your store image

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h2>You can contact us here:</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com/Herbstore" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="icon facebook-icon" />Herbstore
          </a>
          <a href="https://www.instagram.com/Herbstore" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="icon instagram-icon" /> Herbstore
          </a>
        </div>
      </div>
      <div className="divider"></div>
      <div className="contact-right">
        <h2>Or visit us in our store:</h2>
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon location-icon" />
          <span>Nairobi, Kenya</span>
        </div>
        {/* <img src={storeImage} alt="Our Store" className="store-image" /> */}
      </div>
    </div>
  );
}

export default ContactPage;
