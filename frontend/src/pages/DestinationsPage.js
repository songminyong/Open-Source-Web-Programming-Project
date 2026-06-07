import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { destinations, categories, getDestinationWithDefaults } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function DestinationsPage() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetLevel, setBudgetLevel] = useState('all');
  const [minSafety, setMinSafety] = useState(0);
  const [minSoloRating, setMinSoloRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredDestinations = destinations.filter((destination) => {
    const dest = getDestinationWithDefaults(destination);
    const matchesCountry = selectedCountry === 'all' || dest.country === selectedCountry;
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBudget = budgetLevel === 'all' || dest.budget.level === budgetLevel;
    const matchesSafety = dest.safety.rating >= minSafety;
    const matchesSolo = dest.safety.soloFriendly >= minSoloRating;

    return matchesCountry && matchesCategory && matchesSearch && matchesBudget && matchesSafety && matchesSolo;
  });

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Destinations"
        />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="container">
            <div className="max-w-3xl text-white">
              <h1 className="page-hero-title text-white">All Destinations</h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Explore {destinations.length} incredible places across Korea and Mongolia
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="search-wrap max-w-2xl">
              <div className="search-icon-left">
                <Search style={{ width: '20px', height: '20px' }} />
              </div>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control search-input-field"
              />
            </div>

            <div>
              <h3 className="mb-3">Country</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`btn btn-outline ${selectedCountry === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCountry('all')}
                >
                  All Countries
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
                    key={category.id}
                    type="button"
                    className={`btn btn-outline ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.emoji} {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-outline collapsible-btn"
                onClick={() => setFiltersOpen(!filtersOpen)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
                Advanced Filters
              </button>

              <div className={`collapsible-content ${filtersOpen ? 'open' : 'closed'}`} style={{ marginTop: '16px' }}>
                <div className="card" style={{ padding: '24px', backgroundColor: 'var(--input-bg)' }}>
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <h4 className="mb-3" style={{ fontSize: '0.95rem' }}>Budget Level</h4>
                      <div className="flex flex-wrap gap-2">
                        {['all', 'budget', 'moderate', 'luxury'].map((level) => (
                          <button
                            key={level}
                            type="button"
                            className={`btn-select capitalize ${budgetLevel === level ? 'active' : ''}`}
                            onClick={() => setBudgetLevel(level)}
                          >
                            {level === 'all' ? 'All Budgets' : level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="slider-wrap">
                      <label className="form-label">Minimum Safety Rating: {minSafety}/10</label>
                      <input
                        type="range"
                        className="range-slider"
                        value={minSafety}
                        onChange={(e) => setMinSafety(parseFloat(e.target.value))}
                        min="0"
                        max="10"
                        step="0.5"
                      />
                    </div>

                    <div className="slider-wrap">
                      <label className="form-label">Minimum Solo Travel Rating: {minSoloRating}/10</label>
                      <input
                        type="range"
                        className="range-slider"
                        value={minSoloRating}
                        onChange={(e) => setMinSoloRating(parseFloat(e.target.value))}
                        min="0"
                        max="10"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 results-meta" style={{ marginTop: '24px' }}>
            <p>
              Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg mb-2">No destinations found</p>
              <p className="text-sm text-muted">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
