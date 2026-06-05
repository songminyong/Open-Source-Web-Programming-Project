import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Share2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../utils/wishlist';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setWishlistIds(getWishlist());

    const handleUpdate = () => {
      setWishlistIds(getWishlist());
    };

    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  const wishlistDestinations = destinations.filter(d => wishlistIds.includes(d.id));

  const handleClearAll = () => {
    if (window.confirm('Remove all destinations from your wishlist?')) {
      wishlistIds.forEach(id => removeFromWishlist(id));
    }
  };

  const handleShare = () => {
    const destinationNames = wishlistDestinations.map(d => d.name).join(', ');
    const text = `Check out my KoMong travel wishlist: ${destinationNames}`;
    if (navigator.share) {
      navigator.share({
        title: 'My KoMong Wishlist',
        text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Wishlist copied to clipboard!');
    }
  };

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Wishlist"
        />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(239,83,80,0.85), rgba(244,143,177,0.85))' }} />
        <div className="page-hero-content">
          <div className="container">
            <div className="text-white">
              <h1 className="page-hero-title text-white flex items-center gap-3" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                <Heart style={{ width: '40px', height: '40px', fill: 'currentColor' }} />
                My Wishlist
              </h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {wishlistDestinations.length} saved destination{wishlistDestinations.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {wishlistDestinations.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <p className="text-muted">
                  Plan your dream trip with these saved destinations
                </p>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-outline" onClick={handleShare} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Share2 style={{ width: '16px', height: '16px' }} />
                    Share Wishlist
                  </button>
                  <button type="button" className="btn btn-outline" onClick={handleClearAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>

              <div className="mt-12">
                <div className="card text-center" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))' }}>
                  <h3 className="mb-3">Ready to Plan Your Trip?</h3>
                  <p className="text-muted mb-6 max-w-2xl mx-auto">
                    Use our budget planner to estimate costs for your wishlist destinations
                  </p>
                  <Link to="/budget-planner" className="btn btn-primary btn-lg">
                    Plan Your Budget
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state card max-w-2xl mx-auto" style={{ padding: '64px 24px' }}>
              <div className="empty-icon text-muted">❤️</div>
              <h2 className="mb-3">Your Wishlist is Empty</h2>
              <p className="text-muted mb-8">
                Start adding destinations to your wishlist to plan your dream trip
              </p>
              <Link to="/destinations" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ width: '20px', height: '20px' }} />
                Browse Destinations
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
