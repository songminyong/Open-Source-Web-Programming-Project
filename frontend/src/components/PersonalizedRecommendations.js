import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import DestinationCard from './DestinationCard';
import { destinations, getDestinationWithDefaults } from '../data/destinations';

export default function PersonalizedRecommendations() {
  const [preferences, setPreferences] = useState({
    budget: null,
    soloTravel: null
  });

  const [showRecommendations, setShowRecommendations] = useState(false);

  const getRecommendations = () => {
    let filtered = destinations.map(getDestinationWithDefaults);

    if (preferences.budget) {
      filtered = filtered.filter(d => d.budget.level === preferences.budget);
    }

    if (preferences.soloTravel !== null) {
      if (preferences.soloTravel) {
        filtered = filtered.filter(d => d.safety.soloFriendly >= 8);
      } else {
        filtered = filtered.filter(d => d.safety.soloFriendly < 8);
      }
    }

    return filtered.slice(0, 4);
  };

  const recommendations = showRecommendations ? getRecommendations() : [];

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <section className="py-20 rec-section rec-glow bg-light">
      <div className="container">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-green" style={{ width: '28px', height: '28px' }} />
            <h2 className="section-title">Personalized Recommendations</h2>
          </div>
          <p className="text-muted max-w-2xl mx-auto">
            Tell us your preferences and we'll suggest the perfect destinations for you
          </p>
        </div>

        <div className="card rec-card max-w-3xl mx-auto mb-12">
          <div className="space-y-6">
            <div>
              <h4 className="mb-4">What's your budget?</h4>
              <div className="flex flex-wrap gap-3">
                {['budget', 'moderate', 'luxury'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`btn-select capitalize ${preferences.budget === level ? 'active' : ''}`}
                    onClick={() => setPreferences({ ...preferences, budget: level })}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4">Are you traveling solo?</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className={`btn-select ${preferences.soloTravel === true ? 'active' : ''}`}
                  onClick={() => setPreferences({ ...preferences, soloTravel: true })}
                >
                  Yes, Solo Travel
                </button>
                <button
                  type="button"
                  className={`btn-select ${preferences.soloTravel === false ? 'active' : ''}`}
                  onClick={() => setPreferences({ ...preferences, soloTravel: false })}
                >
                  No, Group/Couple
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full btn-lg mt-6"
              onClick={handleGetRecommendations}
              disabled={!preferences.budget && preferences.soloTravel === null}
              style={{ opacity: (!preferences.budget && preferences.soloTravel === null) ? 0.6 : 1 }}
            >
              Get Personalized Recommendations
            </button>
          </div>
        </div>

        {showRecommendations && (
          <div className="animate-up">
            <div className="text-center mb-8">
              <h3 className="mb-2">Perfect Matches for You</h3>
              <div className="flex items-center justify-center gap-2 flex-wrap" style={{ marginTop: '12px' }}>
                {preferences.budget && (
                  <span className="badge uppercase">{preferences.budget} Budget</span>
                )}
                {preferences.soloTravel !== null && (
                  <span className="badge badge-secondary">
                    {preferences.soloTravel ? 'Solo Friendly' : 'Group Friendly'}
                  </span>
                )}
              </div>
            </div>

            <div className="card-grid">
              {recommendations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted">
                  No destinations match your exact criteria, but check out all our destinations!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
