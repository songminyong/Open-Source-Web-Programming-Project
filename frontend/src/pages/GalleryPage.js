import React, { useState, useEffect } from 'react';
import { destinations } from '../data/destinations';

export default function GalleryPage() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 960) setCols(2);
      else setCols(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allImages = destinations.flatMap((dest) =>
    [dest.image, ...dest.gallery].map((img) => ({
      url: img,
      destination: dest.name,
      country: dest.country,
      category: dest.category
    }))
  );

  const filteredImages = allImages.filter((img) => {
    const matchesCountry = selectedCountry === 'all' || img.country === selectedCountry;
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    return matchesCountry && matchesCategory;
  });

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const categories = ['all', 'nature', 'culture', 'adventure', 'city', 'historical'];

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Gallery"
        />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(46,125,50,0.6), rgba(2,136,209,0.6), rgba(255,152,0,0.6))' }} />
        <div className="page-hero-content">
          <div className="container">
            <div className="text-white">
              <h1 className="page-hero-title text-white">Photo Gallery</h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Visual journey through South Korea and Mongolia
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 className="mb-3">Country</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`btn btn-outline ${selectedCountry === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCountry('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn btn-outline ${selectedCountry === 'korea' ? 'active' : ''}`}
                  onClick={() => setSelectedCountry('korea')}
                  style={{
                    backgroundColor: selectedCountry === 'korea' ? 'var(--secondary)' : '',
                    borderColor: selectedCountry === 'korea' ? 'var(--secondary)' : ''
                  }}
                >
                  South Korea
                </button>
                <button
                  type="button"
                  className={`btn btn-outline ${selectedCountry === 'mongolia' ? 'active' : ''}`}
                  onClick={() => setSelectedCountry('mongolia')}
                  style={{
                    backgroundColor: selectedCountry === 'mongolia' ? 'var(--primary)' : '',
                    borderColor: selectedCountry === 'mongolia' ? 'var(--primary)' : ''
                  }}
                >
                  Mongolia
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`btn btn-outline capitalize ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6 results-meta">
            <p>
              Showing {filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{ columnCount: cols, columnGap: '16px' }}>
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(image)}
                className="relative overflow-hidden group"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: 'var(--input-bg)'
                }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${image.url}?w=800&fit=crop`}
                  alt={image.destination}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px',
                    transition: 'transform 0.4s'
                  }}
                  className="gallery-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop';
                  }}
                />
                
                {/* Overlay info */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 80%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    borderRadius: '12px',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                  className="gallery-overlay"
                >
                  <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>{image.destination}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="badge text-xs" style={{ backgroundColor: image.country === 'korea' ? 'var(--secondary)' : 'var(--primary)' }}>
                      {image.country}
                    </span>
                    <span className="badge badge-secondary text-xs">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick style hook to allow overlays on hover */}
          <style>{`
            .group:hover .gallery-overlay {
              opacity: 1 !important;
            }
            .group:hover img {
              transform: scale(1.03);
            }
          `}</style>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg">No photos found</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
          
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://images.unsplash.com/photo-${selectedImage.url}?w=1400&fit=crop`}
              alt={selectedImage.destination}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&fit=crop';
              }}
            />
            <div style={{ color: '#fff', marginTop: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <h3 style={{ color: '#fff', margin: '0 0 8px 0' }}>{selectedImage.destination}</h3>
              <div className="flex gap-2">
                <span className="badge text-xs" style={{ backgroundColor: selectedImage.country === 'korea' ? 'var(--secondary)' : 'var(--primary)' }}>
                  {selectedImage.country}
                </span>
                <span className="badge badge-secondary text-xs">{selectedImage.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
