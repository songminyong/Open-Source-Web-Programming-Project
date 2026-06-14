import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Globe, Moon, Sun, Heart, User, LogOut, LogIn } from 'lucide-react';
import { getWishlist } from '../utils/wishlist';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const handleUpdate = () => setWishlistCount(getWishlist().length);
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/korea', label: 'Korea' },
    { path: '/mongolia', label: 'Mongolia' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/community', label: 'Community' },
    { path: '/budget-planner', label: 'Budget' },
    { path: '/wishlist', label: 'Wishlist' }
  ];

  return (
    <div className="page-wrap">
      <header className={`header ${scrolled ? 'scrolled border-b border-border shadow-sm' : ''}`}>
        <div className="header-inner container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Globe style={{ width: '22px', height: '22px' }} />
            </div>
            <div className="logo-text">
              <span className="logo-title">KoMong</span>
              <span className="logo-sub">Korea & Mongolia</span>
            </div>
          </Link>

          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label === 'Wishlist' && (
                  <Heart style={{ width: '15px', height: '15px', fill: location.pathname === link.path ? 'currentColor' : 'none' }} />
                )}
                {link.label}
                {link.path === '/wishlist' && wishlistCount > 0 && (
                  <span className="wishlist-badge">{wishlistCount}</span>
                )}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="mobile-auth-section">
              {isAuthenticated ? (
                <>
                  <div style={{ padding: '6px 14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Logged in as <strong>{user.username}</strong>
                  </div>
                  <Link to="/profile" className="nav-link">
                    <User style={{ width: '15px', height: '15px' }} />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    style={{ color: '#d32f2f', border: 'none', background: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
                  >
                    <LogOut style={{ width: '15px', height: '15px' }} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    <LogIn style={{ width: '15px', height: '15px' }} />
                    Login
                  </Link>
                  <Link to="/register" className="nav-link" style={{ color: 'var(--primary)' }}>
                    <User style={{ width: '15px', height: '15px' }} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <div className="desktop-auth">
              {isAuthenticated ? (
                <div className="profile-container">
                  <button
                    type="button"
                    className="profile-trigger"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <User style={{ width: '16px', height: '16px' }} />
                    <span>{user.username}</span>
                  </button>
                  {profileDropdownOpen && (
                    <div className="profile-dropdown">
                      <Link to="/profile" className="profile-dropdown-item">
                        <User style={{ width: '14px', height: '14px' }} />
                        My Profile
                      </Link>
                      <button
                        type="button"
                        className="profile-dropdown-item logout-btn"
                        onClick={logout}
                      >
                        <LogOut style={{ width: '14px', height: '14px' }} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost btn-sm" style={{ padding: '6px 12px' }}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm" style={{ padding: '6px 12px' }}>
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              className="theme-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun style={{ width: '18px', height: '18px' }} />
              ) : (
                <Moon style={{ width: '18px', height: '18px' }} />
              )}
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              <span className="menu-bar" style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span className="menu-bar" style={{ opacity: mobileMenuOpen ? 0 : 1, margin: '5px 0' }}></span>
              <span className="menu-bar" style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-flex">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-links">
              <div className="footer-logo">
                <div className="logo-icon" style={{ width: '32px', height: '32px', fontSize: '1.1rem' }}>
                  <Globe style={{ width: '16px', height: '16px' }} />
                </div>
                <span className="logo-title">KoMong</span>
              </div>
              <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
                Discover the best of Korea and Mongolia. From Seoul to the Steppe, explore two incredible cultures.
              </p>
            </div>

            <div className="footer-links">
              <h4>Destinations</h4>
              <Link to="/korea">South Korea</Link>
              <Link to="/mongolia">Mongolia</Link>
              <Link to="/destinations">All Destinations</Link>
            </div>

            <div className="footer-links">
              <h4>Explore</h4>
              <Link to="/gallery">Gallery</Link>
              <Link to="/plan">Plan Your Trip</Link>
              <Link to="/community">Community</Link>
              <Link to="/budget-planner">Budget Planner</Link>
            </div>

            <div className="footer-links">
              <h4>Connect</h4>
              <p>Email: info@komong.com</p>
              <p>Phone: +82-2-123-4567</p>
              <p>Follow us on socials for updates!</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 KoMong. Discover Korea & Mongolia Together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
