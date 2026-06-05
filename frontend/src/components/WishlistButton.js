import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isInWishlist, toggleWishlist } from '../utils/wishlist';

export default function WishlistButton({ destinationId, variant = 'default', className = '' }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWishlist(destinationId));

    const handleUpdate = () => {
      setSaved(isInWishlist(destinationId));
    };

    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, [destinationId]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(destinationId);
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`wishlist-btn ${saved ? 'saved' : ''} ${className}`}
        aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`btn ${saved ? 'btn-primary' : 'btn-outline'} ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
    >
      <Heart className="w-4 h-4" style={{ width: '16px', height: '16px', fill: saved ? 'currentColor' : 'none' }} />
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
