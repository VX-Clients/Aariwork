import React from "react";
import { Instagram, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand & Social */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src="Images/logo-new.png"
              alt="Aari Design Kalai Logo"
            />
            <span>Aari Design Kalai</span>
          </Link>
          <p>
            Elevating the art of Aari embroidery. We bridge tradition with modern creativity, empowering artisans and creators worldwide.
          </p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/aari_design_kalai.73/"
              className="social-link"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@kalaiarasi4291"
              className="social-link"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={20} />
            </a>
            <a
              href="mailto:kalaiarasi6067@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/shop">Shop Materials</Link></li>
            <li><Link to="/policy">Legal Center</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <MapPin className="icon" size={20} />
              <a
                href="https://goo.gl/maps/example"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                940 P Viralimalai, <br />Pudukkottai, TN 621312
              </a>
            </li>
            <li>
              <Phone className="icon" size={20} />
              <a href="tel:+919445738281" className="contact-link">+91 94457 38281</a>
            </li>
            <li>
              <Mail className="icon" size={20} />
              <a href="mailto:kalaiarasi6067@gmail.com" className="contact-link">kalaiarasi6067@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Aari Design Kalai. <br className="mobile-break" />
          Handcrafted with <Heart size={14} color="var(--color-primary)" style={{ display: 'inline', verticalAlign: 'middle' }} fill="var(--color-primary)" /> by <a href="https://www.vibexio.ai/" className="designer-link" target="_blank" rel="noopener noreferrer">VIBEXIO.AI</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
