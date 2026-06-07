import React, { useEffect, useState } from 'react';
import { destinations, categories } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

export default function MongoliaPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dbDestinations, setDbDestinations] = useState([]);
  const [dbError, setDbError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/mongolia')
      .then((res) => res.json())
      .then((data) => {
        setDbDestinations(data);
      })
      .catch((err) => {
        console.error('Failed to fetch Mongolia data:', err);
        setDbError('Failed to load data from database.');
      });
  }, []);

  const mongoliaDestinations = destinations.filter(d => d.country === 'mongolia');
  
  const convertedDbDestinations = dbDestinations.map((dbItem, index) => {
    const staticItem = mongoliaDestinations[index % mongoliaDestinations.length];

    const category =
      dbItem.theme === 'History'
        ? 'historical'
        : dbItem.theme === 'Lake' || dbItem.theme === 'Desert' || dbItem.theme === 'Hot Springs'
          ? 'nature'
          : dbItem.theme.toLowerCase();

    return {
      ...staticItem,
      id: staticItem.id,
      name: dbItem.name.split('(')[0].trim(),
      title: dbItem.name.split('(')[0].trim(),

      shortDescription: dbItem.description,
      description: dbItem.description,

      category: category,
      country: 'mongolia',
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
      <section className="country-hero bg-mongolia-gradient" style={{ height: '400px', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="max-w-3xl text-white">
            <h1 className="country-title text-white">Discover Mongolia</h1>
            <p className="country-desc" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Land of the eternal blue sky, nomadic heritage, and endless steppes.
            </p>
            <div className="flex flex-wrap gap-4 text-sm mt-6">
              <span className="country-stat-badge">🏕️ Nomadic Culture</span>
              <span className="country-stat-badge">🏜️ Gobi Desert</span>
              <span className="country-stat-badge">🐎 Horse Riding</span>
              <span className="country-stat-badge">⛰️ Mountains & Lakes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="mb-6">Explore Mongolian Destinations</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`btn btn-outline ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    backgroundColor: selectedCategory === category.id ? 'var(--primary)' : '',
                    borderColor: selectedCategory === category.id ? 'var(--primary)' : ''
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
          <h2 className="mb-8 text-center">About Mongolia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="mb-4">Nomadic Heritage</h3>
              <p className="text-muted mb-4">
                Mongolia is the last bastion of true nomadic culture, where nearly a third of the population still lives a traditional pastoral lifestyle. Experience staying in a ger (yurt), riding horses across endless grasslands, and sharing meals with herding families.
              </p>
              <p className="text-muted">
                The legacy of Genghis Khan and the Mongol Empire lives on through the people's deep pride in their history, traditional sports like wrestling and archery, and the haunting melodies of throat singing.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Vast Wilderness</h3>
              <p className="text-muted mb-4">
                With one of the lowest population densities in the world, Mongolia offers unparalleled access to pristine wilderness. From the Gobi Desert's singing dunes to the crystal-clear waters of Khövsgöl Lake, nature dominates the landscape.
              </p>
              <p className="text-muted">
                Wildlife thrives in this untouched environment - wild horses, snow leopards, golden eagles, and rare species found nowhere else. Mongolia is an adventurer's paradise and a photographer's dream.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
