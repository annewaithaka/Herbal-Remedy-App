// src/pages/ContactPage.js
import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-info">
        <div className="contact-left">
          <h2>You can Contact us here:</h2>
          <div className="contact-details">
            <div className="contact-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="icon" />
              <span>Herbstore</span>
            </div>
            <div className="contact-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="icon" />
              <span>Herbstore</span>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <h2>Or visit us in our store:</h2>
          <div className="store-details">
            <div className="store-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Octicons-location.svg/375px-Octicons-location.svg.png?20140624114634" alt="Location" className="icon" />
              <span>Nairobi, Kenya</span>
            </div>
            <img src="https://via.placeholder.com/300" alt="Store" className="store-image" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default ContactPage;
