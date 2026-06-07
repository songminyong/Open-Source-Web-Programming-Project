import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Plane, Lightbulb, Image as ImageIcon, DollarSign, Shield, Star, Smartphone, Users } from 'lucide-react';
import { destinations, getDestinationWithDefaults } from '../data/destinations';
import { sampleReviews as reviews } from '../data/reviews';
import WishlistButton from '../components/WishlistButton';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const dest = destinations.find((d) => d.id === id);
  const destination = dest ? getDestinationWithDefaults(dest) : null;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const destinationReviews = reviews.filter(r => r.destinationId === id);

  if (!destination) {
    return (
      <div className="container py-16 text-center">
        <h2 className="mb-4">Destination Not Found</h2>
        <p className="text-muted mb-6">
          Sorry, we couldn't find the destination you're looking for.
        </p>
        <Link to="/destinations" className="btn btn-primary">
          Back to Destinations
        </Link>
      </div>
    );
  }

  const countryColor = destination.country === 'korea' ? '#0288D1' : '#2E7D32';

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const relatedDestinations = destinations
    .filter((d) => d.id !== destination.id && (d.country === destination.country || d.category === destination.category))
    .slice(0, 4);

  return (
    <div>
      <section className="relative h-[400px] md:h-[600px] overflow-hidden" style={{ background: '#000' }}>
        <img
          src={`https://images.unsplash.com/photo-${destination.image}?w=1920&h=1080&fit=crop`}
          alt={destination.name}
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" style={{ pointerEvents: 'none' }} />
        <div className="absolute top-8 left-4 md:left-8 right-4 md:right-8 flex items-start justify-between z-10">
          <Link to="/destinations" className="btn btn-outline text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center' }}>
            <ArrowLeft className="w-4 h-4 mr-2" style={{ width: '16px', height: '16px', marginRight: '6px' }} />
            Back
          </Link>
          <WishlistButton destinationId={destination.id} className="bg-white text-foreground hover:bg-white/90" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-10">
          <div className="container">
            <div className="flex flex-wrap gap-2 mb-4">
              <span style={{ backgroundColor: countryColor }} className="badge text-white capitalize">
                {destination.country}
              </span>
              <span className="badge badge-secondary capitalize">
                {destination.category}
              </span>
            </div>
            <h1 className="text-white mb-2" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '800' }}>{destination.name}</h1>
            <p className="text-xl text-white/90 max-w-3xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{destination.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div className="detail-tabs">
                  <button
                    type="button"
                    className={`detail-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    className={`detail-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}
                  >
                    Gallery
                  </button>
                  <button
                    type="button"
                    className={`detail-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({destinationReviews.length})
                  </button>
                </div>

                <div className={`detail-tab-panel ${activeTab === 'overview' ? 'active' : ''}`}>
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <h3 className="mb-4">About {destination.name}</h3>
                      <p className="text-muted leading-relaxed" style={{ fontSize: '1.05rem' }}>
                        {destination.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-3">Local Transportation</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.transportation.local.map((transport, index) => (
                          <span key={index} className="badge badge-outline">
                            {transport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`detail-tab-panel ${activeTab === 'gallery' ? 'active' : ''}`}>
                  <div className="flex items-center gap-2 mb-6">
                    <ImageIcon className="text-primary" style={{ width: '20px', height: '20px' }} />
                    <h3>Photo Gallery</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destination.gallery.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => openLightbox(index)}
                        className="relative overflow-hidden group cursor-pointer"
                        style={{ border: 'none', background: 'none', padding: 0, width: '100%', height: '120px', borderRadius: '8px' }}
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${img}?w=400&h=400&fit=crop`}
                          alt={`${destination.name} ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`detail-tab-panel ${activeTab === 'reviews' ? 'active' : ''}`}>
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {destinationReviews.length > 0 ? (
                      <>
                        {destinationReviews.map((review) => (
                          <div key={review.id} className="card review-item">
                            <div className="review-header">
                              <div className="avatar">
                                {(review.userName || 'A').charAt(0)}
                              </div>
                              <div className="flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="flex items-center justify-between flex-wrap" style={{ gap: '8px' }}>
                                  <div>
                                    <p className="font-semibold">{review.userName || 'Anonymous'}</p>
                                    <p className="text-xs text-muted">
                                      {new Date(review.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="review-stars">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                      <Star key={i} style={{ width: '14px', height: '14px', fill: '#FF9800', stroke: '#FF9800', marginRight: '1px' }} />
                                    ))}
                                  </div>
                                </div>
                                <h4 className="mt-4 mb-2">{review.title}</h4>
                                <p className="review-text text-sm">{review.content}</p>
                                <div className="flex gap-2 mt-4">
                                  <span className="badge badge-secondary text-xs">
                                    {review.tripType}
                                  </span>
                                  {review.verified && (
                                    <span className="badge badge-outline text-xs">Verified</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="text-center" style={{ marginTop: '24px' }}>
                          <Link to="/community" className="btn btn-outline">
                            View All Reviews & Journals
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted mb-4">No reviews yet for {destination.name}</p>
                        <Link to="/community" className="btn btn-primary">Write First Review</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-primary" style={{ width: '20px', height: '20px' }} />
                  <h3>Location Map</h3>
                </div>
                <div className="map-placeholder">
                  <MapPin className="text-muted mx-auto mb-2" style={{ width: '48px', height: '48px' }} />
                  <p className="font-semibold mb-1">Geographic Coordinates</p>
                  <p className="text-muted">
                    Latitude: {destination.coordinates.lat.toFixed(4)}, Longitude: {destination.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))', padding: '24px' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-green" style={{ width: '20px', height: '20px' }} />
                  <h3>Rating & Safety</h3>
                </div>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="rating-row">
                    <span className="text-sm">Overall Rating</span>
                    <span className="rating-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Star style={{ width: '14px', height: '14px', fill: '#FF9800', stroke: '#FF9800' }} />
                      {destination.reviews.rating}/5
                    </span>
                  </div>
                  <div className="rating-row">
                    <span className="text-sm">Safety Rating</span>
                    <span className="rating-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Shield className="text-green" style={{ width: '14px', height: '14px' }} />
                      {destination.safety.rating}/10
                    </span>
                  </div>
                  <div className="rating-row">
                    <span className="text-sm">Solo Friendly</span>
                    <span className="rating-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Users className="text-blue" style={{ width: '14px', height: '14px' }} />
                      {destination.safety.soloFriendly}/10
                    </span>
                  </div>
                  <div className="rating-row">
                    <span className="text-sm">Female Travel</span>
                    <span className="rating-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Shield style={{ width: '14px', height: '14px', color: 'purple' }} />
                      {destination.safety.femaleTravel}/10
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted mt-4 pt-4" style={{ borderTop: '1px solid var(--border)', fontSize: '0.875rem' }}>
                  {destination.safety.description}
                </p>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="text-green" style={{ width: '20px', height: '20px' }} />
                  <h4>Budget Guide</h4>
                </div>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span className="badge capitalize mb-2">{destination.budget.level}</span>
                    <p className="budget-total" style={{ fontSize: '2rem' }}>
                      ${destination.budget.dailyCost.min}-${destination.budget.dailyCost.max}
                      <span className="text-sm font-normal text-muted" style={{ fontSize: '0.9rem', fontWeight: 'normal', marginLeft: '4px' }}>/day</span>
                    </p>
                  </div>
                  <div className="space-y-2 pt-3 text-sm" style={{ borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <p className="text-muted font-semibold">Accommodation</p>
                      <p>{destination.budget.accommodation}</p>
                    </div>
                    <div>
                      <p className="text-muted font-semibold">Food</p>
                      <p>{destination.budget.food}</p>
                    </div>
                    <div>
                      <p className="text-muted font-semibold">Transportation</p>
                      <p>{destination.budget.transportation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-green shrink-0" style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                    <div>
                      <h4 className="mb-1">Best Time to Visit</h4>
                      <p className="text-sm text-muted">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <Plane className="text-blue shrink-0" style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                    <div>
                      <h4 className="mb-1">How to Get There</h4>
                      <p className="text-sm text-muted">{destination.howToGetThere}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <Smartphone className="text-orange shrink-0" style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                    <div>
                      <h4 className="mb-2">Essential Local Apps</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.transportation.apps.map((app, index) => (
                          <span key={index} className="badge badge-secondary text-xs">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <Lightbulb className="text-green shrink-0" style={{ width: '20px', height: '20px', marginTop: '4px' }} />
                    <div>
                      <h4 className="mb-2">Travel Tips</h4>
                      <ul className="space-y-2 tips-list">
                        {destination.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted" style={{ paddingLeft: '0', position: 'relative' }}>
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ backgroundColor: `${countryColor}12`, padding: '24px', border: `1.5px dashed ${countryColor}` }}>
                <div className="text-center">
                  <h4 className="mb-2">Ready to Visit?</h4>
                  <p className="text-sm text-muted mb-4">
                    Start planning your trip to {destination.name}
                  </p>
                  <Link to="/plan" className="btn w-full text-white font-bold" style={{ backgroundColor: countryColor }}>
                    Plan Your Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {relatedDestinations.length > 0 && (
            <div className="mt-16 border-t pt-16">
              <h2 className="mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedDestinations.map((dest) => (
                  <Link key={dest.id} to={`/destinations/${dest.id}`} style={{ textDecoration: 'none' }}>
                    <div className="card card-hover" style={{ overflow: 'hidden' }}>
                      <div style={{ height: '160px', overflow: 'hidden' }}>
                        <img
                          src={`https://images.unsplash.com/photo-${dest.image}?w=600&h=400&fit=crop`}
                          alt={dest.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop';
                          }}
                        />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h4 className="mb-1" style={{ fontSize: '1.05rem', color: 'var(--text)' }}>{dest.name}</h4>
                        <p className="text-xs text-muted capitalize">
                          {dest.country} • {dest.category}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              cursor: 'pointer'
            }}
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
          <img
            src={`https://images.unsplash.com/photo-${destination.gallery[lightboxIndex]}?w=1200&fit=crop`}
            alt={`${destination.name} gallery fullscreen`}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: 'var(--shadow-lg)' }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&fit=crop';
            }}
          />
        </div>
      )}
    </div>
  );
}
