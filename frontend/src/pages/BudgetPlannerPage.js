import React, { useState } from 'react';
import { DollarSign, Plane, Hotel, Utensils, Car, MapPin, TrendingUp, Calculator } from 'lucide-react';
import { destinations, getDestinationWithDefaults } from '../data/destinations';

export default function BudgetPlannerPage() {
  const [tripDays, setTripDays] = useState(10);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [budgetLevel, setBudgetLevel] = useState('moderate');

  const toggleDestination = (id) => {
    setSelectedDestinations(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const selectedDests = selectedDestinations
    .map(id => getDestinationWithDefaults(destinations.find(d => d.id === id)))
    .filter(Boolean);

  const calculateBudget = () => {
    if (selectedDests.length === 0) return { min: 0, max: 0, breakdown: { flights: 0, accommodation: 0, food: 0, transportation: 0, activities: 0 } };

    const avgDaily = selectedDests.reduce((acc, dest) => {
      const dailyCost = (dest.budget.dailyCost.min + dest.budget.dailyCost.max) / 2;
      return acc + dailyCost;
    }, 0) / selectedDests.length;

    const multiplier = budgetLevel === 'budget' ? 0.7 : budgetLevel === 'luxury' ? 1.5 : 1;
    const dailyCost = avgDaily * multiplier;

    const accommodation = dailyCost * 0.4 * tripDays;
    const food = dailyCost * 0.3 * tripDays;
    const transportation = dailyCost * 0.2 * tripDays;
    const activities = dailyCost * 0.1 * tripDays;
    const flights = selectedDests.some(d => d.country === 'korea') && selectedDests.some(d => d.country === 'mongolia')
      ? 600
      : 400;

    const total = accommodation + food + transportation + activities + flights;

    return {
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15),
      breakdown: {
        flights: Math.round(flights),
        accommodation: Math.round(accommodation),
        food: Math.round(food),
        transportation: Math.round(transportation),
        activities: Math.round(activities)
      }
    };
  };

  const budget = calculateBudget();
  const totalCostAvg = (budget.min + budget.max) / 2;

  return (
    <div>
      <section className="page-hero">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Budget Planner"
        />
        <div className="page-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(76,175,80,0.85), rgba(255,152,0,0.85))' }} />
        <div className="page-hero-content">
          <div className="container">
            <div className="text-white">
              <h1 className="page-hero-title text-white">Budget Planner</h1>
              <p className="text-xl text-white/90" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Estimate costs for your Korea & Mongolia adventure
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "32px",
            alignItems: "start"
            }}
        >
            {/* Input Section (Left, 2 columns on desktop) */}
            <div className="lg:col-span-2 space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h3 className="mb-6">Trip Configuration</h3>
                
                <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="slider-wrap">
                    <label className="form-label" style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between' }}>
                      <span>Trip Duration</span>
                      <span className="text-green font-bold">{tripDays} days</span>
                    </label>
                    <input
                      type="range"
                      className="range-slider mt-2"
                      value={tripDays}
                      onChange={(e) => setTripDays(parseInt(e.target.value))}
                      min="3"
                      max="30"
                      step="1"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>3 days</span>
                      <span>30 days</span>
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-3 block">Travel Style</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['budget', 'moderate', 'luxury'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          className={`btn-select capitalize ${budgetLevel === level ? 'active' : ''}`}
                          onClick={() => setBudgetLevel(level)}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label mb-3 block">Select Destinations</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {destinations.map((dest) => {
                        const isChecked = selectedDestinations.includes(dest.id);
                        return (
                          <div
                            key={dest.id}
                            className={`checkbox-card ${isChecked ? 'checked' : ''}`}
                            onClick={() => toggleDestination(dest.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              style={{ marginRight: '8px' }}
                            />
                            <div style={{ flex: 1 }}>
                              <p className="font-semibold text-sm" style={{ color: 'var(--text)', margin: 0 }}>{dest.name}</p>
                              <p className="text-xs text-muted capitalize" style={{ margin: 0 }}>
                                {dest.country}
                              </p>
                            </div>
                            <MapPin className="shrink-0" style={{ width: '16px', height: '16px', color: isChecked ? 'var(--primary)' : 'var(--text-muted)' }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar (Right, 1 column on desktop) */}
                <div
                  className="space-y-6"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    position: 'sticky',
                    top: '100px',
                    alignSelf: 'start'
                  }}
>              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(2,136,209,0.08))', padding: '32px', textAlign: 'center' }}>
                <Calculator className="text-green mx-auto mb-3" style={{ width: '40px', height: '40px' }} />
                <p className="text-sm text-muted mb-2 font-semibold">Estimated Total Cost</p>
                <h2 className="mb-2" style={{ color: 'var(--text)', fontSize: '2.2rem', fontWeight: '800', transition: 'all 0.3s ease' }}>
                  {selectedDestinations.length > 0 ? (
                    `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`
                  ) : (
                    '$0'
                  )}
                </h2>
                <p className="text-xs text-muted mb-4">
                  For {tripDays} days, {selectedDestinations.length} destinations
                </p>
                {selectedDestinations.length > 0 ? (
                  <span className="badge badge-secondary capitalize">
                    {budgetLevel} Style
                  </span>
                ) : (
                  <span className="badge badge-outline" style={{ color: 'var(--text-muted)' }}>
                    Select destinations to estimate
                  </span>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 className="mb-6">Cost Breakdown</h3>
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: Plane, label: 'Flights', amount: budget.breakdown.flights, color: 'text-blue', barColor: 'var(--secondary)' },
                    { icon: Hotel, label: 'Accommodation', amount: budget.breakdown.accommodation, color: 'text-green', barColor: 'var(--primary)' },
                    { icon: Utensils, label: 'Food & Drinks', amount: budget.breakdown.food, color: 'text-orange', barColor: 'var(--accent)' },
                    { icon: Car, label: 'Transportation', amount: budget.breakdown.transportation, color: 'text-blue', barColor: 'var(--secondary)' },
                    { icon: TrendingUp, label: 'Activities & Tours', amount: budget.breakdown.activities, color: 'text-green', barColor: 'var(--primary)' }
                  ].map(({ icon: Icon, label, amount, color, barColor }) => {
                    const percentage = totalCostAvg > 0 ? (amount / totalCostAvg) * 100 : 0;
                    return (
                      <div key={label} className="breakdown-item" style={{ paddingBottom: '12px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                          <div className="flex items-center gap-3">
                            <Icon className={color} style={{ width: '18px', height: '18px' }} />
                            <span className="text-sm">{label}</span>
                          </div>
                          <span className="font-semibold" style={{ fontSize: '1.05rem' }}>${amount.toLocaleString()}</span>
                        </div>
                        <div style={{ width: '100%', backgroundColor: 'var(--border)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${percentage}%`,
                            backgroundColor: barColor,
                            height: '100%',
                            borderRadius: '3px',
                            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Destinations List */}
              {selectedDests.length > 0 && (
                <div className="card" style={{ padding: '24px' }}>
                  <h4 className="mb-4">Selected Destinations</h4>
                  <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedDests.map((dest) => (
                      <div key={dest.id} className="flex items-center justify-between text-sm" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                        <div>
                          <p className="font-semibold" style={{ margin: 0 }}>{dest.name}</p>
                          <p className="text-xs text-muted" style={{ margin: 0 }}>
                            ${dest.budget.dailyCost.min}-${dest.budget.dailyCost.max}/day
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => toggleDestination(dest.id)}
                          style={{ color: '#d32f2f', padding: '4px 8px' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="card" style={{ padding: '24px' }}>
                <h4 className="mb-3">Money-Saving Tips</h4>
                <ul className="space-y-2 text-sm text-muted tips-list" style={{ padding: 0 }}>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">•</span>
                    Book accommodations at least 2 months in advance.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">•</span>
                    Eat at street markets and local mom-and-pop shops.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">•</span>
                    Use subway passes in Korea, share vehicles in Mongolia.
                  </li>
                  <li style={{ display: 'flex', gap: '8px' }}>
                    <span className="text-green">•</span>
                    Travel during shoulder season (May or September).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="mb-8 text-center">Budget Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card" style={{ padding: '24px' }}>
              <Hotel className="text-green" style={{ width: '32px', height: '32px', marginBottom: '16px' }} />
              <h4 className="mb-2">Accommodation</h4>
              <p className="text-sm text-muted">
                Hostels and guesthouses offer great value. Consider traditional ger camps in Mongolia for authentic, low-cost stays.
              </p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <Utensils className="text-green" style={{ width: '32px', height: '32px', marginBottom: '16px' }} />
              <h4 className="mb-2">Food & Dining</h4>
              <p className="text-sm text-muted">
                Street food and traditional markets are extremely cheap and high-quality. Korean convenience stores also have quick, budget meals.
              </p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <Car className="text-green" style={{ width: '32px', height: '32px', marginBottom: '16px' }} />
              <h4 className="mb-2">Local Transport</h4>
              <p className="text-sm text-muted">
                South Korea's public subways and buses are stellar and low cost. In Mongolia, hiring a shared 4WD splits expenses nicely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
