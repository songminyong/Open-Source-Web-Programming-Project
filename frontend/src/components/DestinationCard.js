import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Star, DollarSign, Shield } from 'lucide-react';
import WishlistButton from './WishlistButton';
import { getDestinationWithDefaults } from '../data/destinations';

export default function DestinationCard({ destination: dest }) {
  const destination = getDestinationWithDefaults(dest);
  const countryClass = destination.country === 'korea' ? 'badge-secondary' : '';

  return (
    <div className="card card-hover dest-card">
      <div className="dest-card-img-wrap">
        <img
          src={`https://images.unsplash.com/photo-${destination.image}?w=800&h=600&fit=crop`}
          alt={destination.name}
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop`;
          }}
        />
        <div className="dest-card-badges">
          <span className={`badge ${countryClass} uppercase`}>
            {destination.country}
          </span>
          <WishlistButton destinationId={destination.id} variant="icon" />
        </div>
        <div className="dest-card-gradient"></div>
        <h3 className="dest-card-title-overlay text-white" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{destination.name}</h3>
      </div>
      
      <div className="dest-card-body">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="text-muted shrink-0" style={{ width: '16px', height: '16px', marginTop: '4px' }} />
          <p className="text-sm text-muted line-clamp-2">
            {destination.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-outline text-xs capitalize">
            {destination.category}
          </span>
          <span className="badge badge-outline text-xs" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <DollarSign style={{ width: '12px', height: '12px' }} />
            {destination.budget.level}
          </span>
        </div>

        <div className="dest-card-meta">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Star style={{ width: '14px', height: '14px', fill: '#FF9800', stroke: '#FF9800' }} />
            {destination.reviews.rating}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Shield style={{ width: '14px', height: '14px' }} />
            Safety {destination.safety.rating}/10
          </span>
        </div>

        <div className="mt-4" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          <Link to={`/destinations/${destination.id}`} className="btn btn-ghost w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Explore
            <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
