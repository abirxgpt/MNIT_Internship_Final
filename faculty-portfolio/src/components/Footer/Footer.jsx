import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Meenakshi Tripathi | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
