import React, { useEffect, useState } from 'react';
import { destinations, categories } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function KoreaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [dbDestinations, setDbDestinations] = useState([]);
  const [dbError, setDbError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/korea')
      .then((res) => res.json())
      .then((data) => {
        setDbDestinations(data);
      })
      .catch((err) => {
        console.error('Failed to fetch Korea data:', err);
        setDbError('Failed to load data from database.');
      });
  }, []);

        const koreaStaticDestinations = destinations.filter(d => d.country === 'korea');

        const convertedDbDestinations = dbDestinations.map((dbItem, index) => {
          const staticItem = koreaStaticDestinations[index % koreaStaticDestinations.length];

          return {
            ...staticItem,
            id: staticItem.id,
            name: dbItem.name.split('(')[0].trim(),
            title: dbItem.name.split('(')[0].trim(),

            shortDescription: dbItem.description,
            description: dbItem.description,

            category:
              dbItem.theme === 'History'
                ? 'historical'
                : dbItem.theme.toLowerCase(),

            country: 'korea',
            region: dbItem.region,

            estimated_cost_krw: dbItem.estimated_cost_krw,

            budget: {
                ...staticItem.budget,
                level: `${dbItem.estimated_cost_krw.toLocaleString()} KRW`
           } 
          };
        });

        const filteredDestinations = selectedCategory === 'all'
          ? convertedDbDestinations
          : convertedDbDestinations.filter(d => d.category === selectedCategory);

  return (
    <div>
      <section className="country-hero bg-korea-gradient" style={{ height: '400px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="max-w-3xl text-white">
            <h1 className="country-title text-white">Discover South Korea</h1>
            <p className="country-desc" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              From ancient palaces to modern metropolises, K-pop culture to Buddhist temples.
            </p>
            <div className="flex flex-wrap gap-4 text-sm mt-6">
              <span className="country-stat-badge">🏯 Historic Sites</span>
              <span className="country-stat-badge">🏙️ Modern Cities</span>
              <span className="country-stat-badge">🏖️ Island Paradise</span>
              <span className="country-stat-badge">🍜 Amazing Cuisine</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-6">Explore Korean Destinations</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`btn btn-outline ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    backgroundColor: selectedCategory === category.id ? 'var(--secondary)' : '',
                    borderColor: selectedCategory === category.id ? 'var(--secondary)' : ''
                  }}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">No destinations found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="mb-8 text-center">About South Korea</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="mb-4">Culture & Tradition</h3>
              <p className="text-muted mb-4">
                South Korea beautifully preserves its 5,000-year-old cultural heritage while embracing cutting-edge technology and modern trends. Experience the harmony of ancient Joseon-era palaces standing alongside futuristic skyscrapers.
              </p>
              <p className="text-muted">
                From traditional hanbok clothing and tea ceremonies to the global phenomenon of K-pop and Korean dramas, Korea offers a unique blend of old and new that captivates visitors from around the world.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Natural Beauty</h3>
              <p className="text-muted mb-4">
                Despite being a densely populated country, South Korea boasts stunning natural landscapes. Explore volcanic Jeju Island, hike through Seoraksan's dramatic peaks, relax on pristine beaches, and witness spectacular cherry blossoms in spring.
              </p>
              <p className="text-muted">
                The country's four distinct seasons each offer unique experiences, from spring cherry blossoms to vibrant autumn foliage that paints the mountains in brilliant reds and golds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
