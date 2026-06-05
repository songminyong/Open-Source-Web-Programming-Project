import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1765375783767-6f48d65d336c?w=1920&h=1080&fit=crop',
    title: 'Discover Korea & Mongolia Together',
    subtitle: 'From Seoul to the Steppe - Experience Two Incredible Cultures'
  },
  {
    url: 'https://images.unsplash.com/photo-1742388216376-b8aeeaa1efc1?w=1920&h=1080&fit=crop',
    title: 'Mongolia Steppe',
    subtitle: 'Endless Horizons and Sacred Landscapes Await'
  },
  {
    url: 'https://images.unsplash.com/photo-1670983245382-6ba650ef9594?w=1920&h=1080&fit=crop',
    title: 'Jeju Island, Korea',
    subtitle: 'Island Paradise and Natural Volcanic Wonders'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      <div 
        className="hero-slides" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <div key={index} className="hero-slide">
            <img src={image.url} alt={image.title} />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="container">
                <div className="max-w-2xl animate-up">
                  <h1 className="hero-title" style={{ color: '#fff' }}>{image.title}</h1>
                  <p className="hero-desc">{image.subtitle}</p>
                  <div className="hero-actions">
                    <Link to="/destinations" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      Explore Destinations
                      <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
                    </Link>
                    <Link to="/plan" className="btn btn-outline btn-lg text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center' }}>
                      Plan Your Trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
