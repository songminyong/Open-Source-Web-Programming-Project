import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ThumbsUp, MessageCircle, Calendar, User, MapPin, TrendingUp, X } from 'lucide-react';
import { sampleReviews, sampleJournals } from '../data/reviews';
import { destinations } from '../data/destinations';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [reviewsList, setReviewsList] = useState(sampleReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const [formName, setFormName] = useState('');
  const [formDest, setFormDest] = useState('seoul');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  const filteredReviews = selectedFilter === 'all'
    ? reviewsList
    : selectedFilter === 'solo'
    ? reviewsList.filter(r => r.tripType === 'solo')
    : reviewsList.filter(r => r.content.toLowerCase().includes('budget') || r.title.toLowerCase().includes('budget'));

  const handleHelpfulClick = (id) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!formTitle || !formContent) return;

    const matchedDest = destinations.find(d => d.id === formDest);
    const newRev = {
      id: reviewsList.length + 1,
      user: formName || 'Anonymous Traveler',
      avatar: (formName || 'A').charAt(0).toUpperCase(),
      destination: matchedDest ? matchedDest.name : 'Seoul',
      destinationId: formDest,
      rating: formRating,
      title: formTitle,
      content: formContent,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false,
      tripType: 'solo'
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewForm(false);
    setFormName('');
    setFormTitle('');
    setFormContent('');
    setFormRating(5);
  };

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Community"
        />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(255,152,0,0.85), rgba(255,111,0,0.85))' }} />
        <div className="page-hero-content">
          <div className="container">
            <div className="text-white">
              <h1 className="page-hero-title text-white">Travel Community</h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Real experiences and stories from real travelers
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="tabs-bar mb-8">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews & Tips
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'journals' ? 'active' : ''}`}
              onClick={() => setActiveTab('journals')}
            >
              Travel Journals
            </button>
          </div>

          <div className={`tab-panel ${activeTab === 'reviews' ? 'active' : ''}`}>
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn btn-outline ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All Reviews
              </button>
              <button
                type="button"
                className={`btn btn-outline ${selectedFilter === 'solo' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('solo')}
              >
                Solo Travel
              </button>
              <button
                type="button"
                className={`btn btn-outline ${selectedFilter === 'budget' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('budget')}
              >
                Budget Travel
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredReviews.map((review) => {
                  const destInfo = destinations.find(d => d.id === review.destinationId);
                  return (
                    <div className="card review-item" key={review.id}>
                      <div className="review-header">
                        <div className="avatar">
                          {review.avatar || (review.user ? review.user.charAt(0) : 'A')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between flex-wrap mb-2" style={{ gap: '8px' }}>
                            <div>
                              <p className="font-semibold">{review.user || review.userName}</p>
                              <div className="flex items-center gap-2 text-xs text-muted mt-1" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <Calendar style={{ width: '12px', height: '12px' }} />
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="review-stars">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} style={{ width: '14px', height: '14px', fill: '#FF9800', stroke: '#FF9800', marginRight: '1px' }} />
                              ))}
                            </div>
                          </div>

                          {destInfo && (
                            <Link to={`/destinations/${destInfo.id}`} style={{ display: 'inline-block', marginBottom: '12px' }}>
                              <span className="badge badge-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin style={{ width: '12px', height: '12px' }} />
                                {destInfo.name}
                              </span>
                            </Link>
                          )}

                          <h4 className="mb-2">{review.title}</h4>
                          <p className="text-muted text-sm mb-4 leading-relaxed">{review.content}</p>

                          <div className="flex items-center justify-between text-xs text-muted" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                            <button
                              type="button"
                              className="btn-text text-green"
                              onClick={() => handleHelpfulClick(review.id)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '4px' }}
                            >
                              <ThumbsUp style={{ width: '14px', height: '14px' }} />
                              Helpful ({review.helpful})
                            </button>
                            <span className="badge badge-secondary">{review.tripType || 'solo'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <h3 className="mb-4">Top Contributors</h3>
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {['Emma Rodriguez', 'Michael Chen', 'Sarah Johnson'].map((name, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="avatar" style={{ width: '38px', height: '38px' }}>
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{name}</p>
                          <p className="text-xs text-muted">{15 - i * 2} reviews</p>
                        </div>
                        <TrendingUp className="text-green" style={{ width: '16px', height: '16px' }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card text-white bg-orange-gradient" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--accent), #F57C00)' }}>
                  <h4 className="text-white mb-2">Share Your Experience</h4>
                  <p className="text-sm text-white/90 mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Help fellow travelers by sharing your Korea & Mongolia adventures
                  </p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowReviewForm(true)}
                    style={{ background: '#fff', color: '#E65100', width: '100%', fontWeight: 'bold' }}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`tab-panel ${activeTab === 'journals' ? 'active' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleJournals.map((journal) => (
                <div className="card journal-card" key={journal.id}>
                  <div className="journal-cover">
                    <img
                      src={`https://images.unsplash.com/photo-${journal.coverImage}?w=800&h=600&fit=crop`}
                      alt={journal.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>
                  <div className="journal-body">
                    <h4 className="mb-2 line-clamp-2">{journal.title}</h4>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                        {journal.avatar || journal.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{journal.author}</p>
                        <p className="text-xs text-muted">
                          {new Date(journal.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted mb-4 line-clamp-3 leading-relaxed">
                      {journal.excerpt}
                    </p>

                    <div className="journal-tags mb-4">
                      {journal.destinations && journal.destinations.slice(0, 3).map((dest) => (
                        <span key={dest} className="journal-tag">
                          {dest}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                      <div className="flex items-center gap-3">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <ThumbsUp style={{ width: '13px', height: '13px' }} />
                          {journal.likes || 12}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <MessageCircle style={{ width: '13px', height: '13px' }} />
                          {journal.comments || 4}
                        </span>
                      </div>
                      <span>{journal.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="card max-w-2xl mx-auto" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))' }}>
                <User className="text-green mx-auto mb-4" style={{ width: '40px', height: '40px' }} />
                <h3 className="mb-3">Start Your Travel Journal</h3>
                <p className="text-muted mb-6">
                  Document your journey and inspire other travelers from around the world
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => alert('Journal creation is coming soon!')}
                >
                  Create Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission Modal overlay */}
      {showReviewForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-card)',
              position: 'relative',
              animation: 'fadeUp 0.3s ease-out'
            }}
          >
            <div className="card-header flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px' }}>
              <h3 style={{ margin: 0 }}>Write a Review</h3>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <form onSubmit={handleCreateReview} className="card-body" style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Emma R."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Destination</label>
                <select
                  className="form-control select-input"
                  value={formDest}
                  onChange={(e) => setFormDest(e.target.value)}
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= formRating ? 'active' : ''}
                      onClick={() => setFormRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Review Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Incredible trip!"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Review Content</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Describe your experience, local tips, cost..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
