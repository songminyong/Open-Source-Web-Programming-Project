import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center animate-up" style={{ minHeight: '600px' }}>
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <h1 style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>
            Oops! The page you're looking for seems to have wandered off the map.
            Let's get you back on track to discover Korea and Mongolia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Home style={{ width: '20px', height: '20px' }} />
              Go Home
            </Link>
            <Link to="/destinations" className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Compass style={{ width: '20px', height: '20px' }} />
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}