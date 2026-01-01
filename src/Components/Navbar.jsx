import React, { useState } from "react";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../Components/CSS/Navbar.css";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openCart, cartCount } = useProducts();

  const isActivePath = (path) => location.pathname === path;
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="Images/logo-new.png"
            alt="Aari Design Kalai Logo"
          /> Aari Design Kalai
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${isActivePath("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`nav-link ${isActivePath("/courses") ? "active" : ""}`}
          >
            Courses
          </Link>
          <Link
            to="/shop"
            className={`nav-link ${isActivePath("/shop") ? "active" : ""}`}
          >
            Shop
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <a
            href="https://wa.me/919445738281"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-nav-btn"
            aria-label="Chat on WhatsApp"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#25D366',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <MessageCircle size={18} fill="white" />
            <span style={{ display: 'inline' }}>Chat</span>
          </a>

          <button
            className="cart-btn"
            onClick={openCart}
            style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)' }}
          >
            <ShoppingBag />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--color-primary)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu">
          <Link
            to="/"
            className={`mobile-link ${isActivePath("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`mobile-link ${isActivePath("/courses") ? "active" : ""
              }`}
          >
            Courses
          </Link>
          <Link
            to="/shop"
            className={`mobile-link ${isActivePath("/shop") ? "active" : ""
              }`}
          >
            Shop
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
