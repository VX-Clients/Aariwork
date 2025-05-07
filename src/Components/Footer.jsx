import React from "react";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footeer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ADK
          </Link>
          <p>Empowering women through the art of Aari embroidery since 2020.</p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/designs">Designs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <MapPin className="icon" />
              <a
                    href="https://www.google.com/maps/search/?api=1&query=940+P+Viralimalai,+Pudukkottai,+TN+621312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    940 P Viralimalai, Pudukkottai, TN 621312
                  </a>
            </li>
            <li>
              <Mail className="icon" />
              <a href="mailto:contact@adkaari.com">contact@adkaari.com</a>
            </li>
            <li>
              <Phone className="icon" />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ADK Aari Creation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
