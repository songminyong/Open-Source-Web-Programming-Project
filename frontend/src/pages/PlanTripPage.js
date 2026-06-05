import React, { useState } from 'react';
import { Calendar, Users, Plane, MapPin, Mail, Check } from 'lucide-react';

export default function PlanTripPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelers: '2',
    duration: '7-10',
    interests: [],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const interests = [
    { id: 'culture', label: 'Cultural Heritage', icon: '🏛️' },
    { id: 'nature', label: 'Nature & Wildlife', icon: '🏔️' },
    { id: 'adventure', label: 'Adventure Activities', icon: '🎿' },
    { id: 'food', label: 'Food & Cuisine', icon: '🍜' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘' }
  ];

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '600px' }}>
        <div className="container">
          <div className="card max-w-2xl mx-auto text-center" style={{ padding: '48px' }}>
            <div className="success-check">
              <Check className="w-10 h-10 text-white" style={{ width: '40px', height: '40px' }} />
            </div>
            <h2 className="mb-4">Thank You!</h2>
            <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>
              We've received your trip planning request. Our travel experts will contact you within 24 hours to discuss your perfect Korea-Mongolia adventure.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Plan Your Trip"
        />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(46,125,50,0.8), rgba(2,136,209,0.8))' }} />
        <div className="page-hero-content">
          <div className="container">
            <div className="text-white">
              <h1 className="page-hero-title text-white">Plan Your Trip</h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Let us help you create your perfect Korea-Mongolia adventure
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card animate-up" style={{ padding: '32px' }}>
                <h2 className="mb-6" style={{ fontSize: '1.8rem' }}>Tell Us About Your Dream Trip</h2>
                <form onSubmit={handleSubmit} className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="travelers" className="form-label">Number of Travelers</label>
                      <select
                        id="travelers"
                        className="form-control select-input"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      >
                        <option value="1">Solo Traveler</option>
                        <option value="2">2 People</option>
                        <option value="3-4">3-4 People</option>
                        <option value="5-8">5-8 People</option>
                        <option value="9+">9+ People</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration" className="form-label">Trip Duration</label>
                      <select
                        id="duration"
                        className="form-control select-input"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      >
                        <option value="3-5">3-5 Days</option>
                        <option value="7-10">7-10 Days</option>
                        <option value="10-14">10-14 Days</option>
                        <option value="14+">14+ Days</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-3 block">What interests you?</label>
                    <div className="interest-grid">
                      {interests.map((interest) => {
                        const isSelected = formData.interests.includes(interest.id);
                        return (
                          <div
                            key={interest.id}
                            className={`interest-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleInterest(interest.id)}
                          >
                            <span className="interest-emoji">{interest.icon}</span>
                            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{interest.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Tell us more about your trip</label>
                    <textarea
                      id="message"
                      className="form-control"
                      rows="6"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your preferences, special requests, budget considerations, or any questions you have..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
                    Submit Trip Request
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))' }}>
                <h3 className="mb-4">Why Plan With KoMong?</h3>
                <ul className="space-y-3 tips-list" style={{ padding: 0 }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">✓</span>
                    Expert knowledge of both Korea and Mongolia.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">✓</span>
                    Customized itineraries based on your interests.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">✓</span>
                    Local guides and authentic experiences.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">✓</span>
                    24/7 support throughout your journey.
                  </li>
                </ul>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <h4 className="mb-4">Contact Information</h4>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="flex items-center gap-3">
                    <Mail style={{ width: '18px', height: '18px', color: 'var(--text-muted)' }} />
                    <span className="text-sm">info@komong.travel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Plane style={{ width: '18px', height: '18px', color: 'var(--text-muted)' }} />
                    <span className="text-sm">Seoul & Ulaanbaatar Offices</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '24px', background: 'var(--accent-light)' }}>
                <h4 className="mb-3 text-orange">Popular Itineraries</h4>
                <ul className="space-y-2 text-sm text-muted tips-list" style={{ padding: 0 }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-orange">•</span>
                    Seoul to Gobi Desert (12 days)
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-orange">•</span>
                    Korea Highlights (7 days)
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-orange">•</span>
                    Mongolia Wilderness (10 days)
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-orange">•</span>
                    Combined Cultural Explorer (14 days)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="mb-8 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div style={{ padding: '16px' }}>
              <div className="w-16 h-16 bg-green-gradient rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%' }}>
                <Calendar className="text-white" style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 className="mb-2">1. Submit Request</h4>
              <p className="text-sm text-muted">
                Fill out the form with your preferences.
              </p>
            </div>
            <div style={{ padding: '16px' }}>
              <div className="w-16 h-16 bg-blue-gradient rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%' }}>
                <Users className="text-white" style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 className="mb-2">2. Consultation</h4>
              <p className="text-sm text-muted">
                We'll discuss your needs and budget.
              </p>
            </div>
            <div style={{ padding: '16px' }}>
              <div className="w-16 h-16 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%' }}>
                <MapPin className="text-white" style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 className="mb-2">3. Finalize Itinerary</h4>
              <p className="text-sm text-muted">
                Approve your customized travel plan.
              </p>
            </div>
            <div style={{ padding: '16px' }}>
              <div className="w-16 h-16 bg-green-gradient rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%' }}>
                <Plane className="text-white" style={{ width: '28px', height: '28px' }} />
              </div>
              <h4 className="mb-2">4. Start Your Journey</h4>
              <p className="text-sm text-muted">
                Embark on your unforgettable adventure!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
