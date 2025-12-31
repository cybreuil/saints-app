import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-link">
            <img src="/logo.svg" alt="Saints App Logo" className="logo-img" />
            <span className="logo-text">Saints App</span>
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/saint-of-the-day" 
              className={`nav-link ${isActive('/saint-of-the-day') ? 'active' : ''}`}
            >
              Saint of the Day
            </Link>
            <Link 
              to="/saints" 
              className={`nav-link ${isActive('/saints') ? 'active' : ''}`}
            >
              Browse Saints
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Saints App. A Catholic Saints Information Resource.
          </p>
          <div className="footer-links">
            <a href="https://github.com/cybreuil/saints-app" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <span className="footer-separator">•</span>
            <Link to="/about" className="footer-link">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
