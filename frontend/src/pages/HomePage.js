import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Mountain, Compass, Star, Heart, DollarSign, Users, Shield, MessageCircle, Smartphone } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import DestinationCard from '../components/DestinationCard';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import { destinations } from '../data/destinations';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'USA',
    text: 'KoMong made planning my Korea-Mongolia trip effortless. The cultural experiences were unforgettable!',
    rating: 5
  },
  {
    name: 'Batbayar Erdene',
    location: 'Mongolia',
    text: 'As a local guide, I appreciate how accurately KoMong represents our beautiful country.',
    rating: 5
  },
  {
    name: 'Ji-woo Kim',
    location: 'South Korea',
    text: 'Perfect blend of both countries. The itinerary suggestions were spot-on!',
    rating: 5
  }
];

export default function HomePage() {
  const featuredDestinations = destinations.slice(0, 8);

  return (
    <div>
      <HeroSlider />

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card value-card">
              <div className="value-icon bg-green-gradient">
                <Globe style={{ width: '32px', height: '32px' }} />
              </div>
              <h3 className="mb-3">Two Countries, One Journey</h3>
              <p className="text-muted">
                Seamlessly explore the vibrant cities of Korea and the vast landscapes of Mongolia.
              </p>
            </div>

            <div className="card value-card">
              <div className="value-icon bg-blue-gradient">
                <Mountain style={{ width: '32px', height: '32px' }} />
              </div>
              <h3 className="mb-3">Authentic Experiences</h3>
              <p className="text-muted">
                From Seoul's palaces to Mongolia's nomadic gers, experience genuine cultural immersion.
              </p>
            </div>

            <div className="card value-card">
              <div className="value-icon bg-orange-gradient">
                <Compass style={{ width: '32px', height: '32px' }} />
              </div>
              <h3 className="mb-3">Expert Guidance</h3>
              <p className="text-muted">
                Carefully curated destinations and travel tips from local experts who know the area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore our handpicked selection of must-visit places across Korea and Mongolia
            </p>
          </div>

          <div className="card-grid mb-12">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/destinations" className="btn btn-outline btn-lg" style={{ display: 'inline-flex', alignItems: 'center' }}>
              View All Destinations
              <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      <PersonalizedRecommendations />

      <section className="py-20" style={{ background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2>Why Choose KoMong</h2>
            <p className="text-muted max-w-2xl mx-auto mt-2">
              We specialize in creating unforgettable journeys between these two fascinating countries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-gradient text-white rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <span style={{ fontSize: '1.4rem' }}>🏛️</span>
              </div>
              <div>
                <h4 className="mb-2">Rich Cultural Heritage</h4>
                <p className="text-sm text-muted">
                  Experience ancient temples, royal palaces, and nomadic traditions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-gradient text-white rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <span style={{ fontSize: '1.4rem' }}>🏔️</span>
              </div>
              <div>
                <h4 className="mb-2">Natural Wonders</h4>
                <p className="text-sm text-muted">
                  From volcanic islands to vast steppes and desert landscapes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-gradient text-white rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <span style={{ fontSize: '1.4rem' }}>🍜</span>
              </div>
              <div>
                <h4 className="mb-2">Culinary Adventures</h4>
                <p className="text-sm text-muted">
                  Savor Korean BBQ, kimchi, buuz dumplings, and traditional mare's milk.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-gradient text-white rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <span style={{ fontSize: '1.4rem' }}>✨</span>
              </div>
              <div>
                <h4 className="mb-2">Modern & Traditional</h4>
                <p className="text-sm text-muted">
                  Experience cutting-edge cities and timeless nomadic lifestyles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2>What Travelers Say</h2>
            <p className="text-muted max-w-2xl mx-auto mt-2">
              Hear from those who've experienced the magic of Korea and Mongolia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card testimonial-card">
                <div className="stars-display">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} style={{ width: '18px', height: '18px', fill: '#FF9800', stroke: '#FF9800', marginRight: '2px' }} />
                  ))}
                </div>
                <p className="testimonial-text">
                  "{testimonial.text}"
                </p>
                <div className="testimonial-user">
                  <div className="avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Smart Travel Features</h2>
            <p className="text-muted max-w-2xl mx-auto mt-2">
              Everything you need to plan your perfect Korea-Mongolia adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <DollarSign className="text-green" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Budget Planner</h4>
                  <p className="text-sm text-muted mb-6">
                    Calculate trip costs with our smart budget tool. Get estimates for accommodation, food, and transport.
                  </p>
                </div>
                <Link to="/budget-planner" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  Try It <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Shield className="text-blue" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Safety Ratings</h4>
                  <p className="text-sm text-muted mb-6">
                    See safety scores, solo-travel ratings, and female traveler ratings for every destination.
                  </p>
                </div>
                <Link to="/destinations" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  Explore <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <MessageCircle className="text-orange" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Travel Community</h4>
                  <p className="text-sm text-muted mb-6">
                    Read real reviews, travel journals, and tips from fellow travelers who've been there.
                  </p>
                </div>
                <Link to="/community" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  Join <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Heart className="text-green" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Save & Plan</h4>
                  <p className="text-sm text-muted mb-6">
                    Create your wishlist of dream destinations and build your perfect itinerary.
                  </p>
                </div>
                <Link to="/wishlist" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  Start <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Smartphone className="text-blue" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Local Apps Guide</h4>
                  <p className="text-sm text-muted mb-6">
                    Essential transportation apps, maps, and tools for navigating Korea and Mongolia.
                  </p>
                </div>
                <Link to="/destinations" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  View <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>

            <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Users className="text-orange" style={{ width: '40px', height: '40px', marginBottom: '16px' }} />
                  <h4 className="mb-2">Solo Travel Tips</h4>
                  <p className="text-sm text-muted mb-6">
                    Discover solo-friendly destinations with high safety ratings and helpful local guides.
                  </p>
                </div>
                <Link to="/community" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start' }}>
                  Learn <ArrowRight style={{ width: '16px', height: '16px', marginLeft: '6px' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-gradient text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
        <div className="container text-center">
          <h2 className="text-white mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Let KoMong guide you through an unforgettable journey across Korea and Mongolia
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/plan" className="btn btn-lg" style={{ background: '#fff', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center' }}>
              Plan Your Trip Now
              <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </Link>
            <Link to="/budget-planner" className="btn btn-outline btn-lg text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center' }}>
              Calculate Budget
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
