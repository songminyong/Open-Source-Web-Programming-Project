export const defaultBudgetData = {
  korea: {
    budget: {
      level: 'moderate',
      dailyCost: { min: 50, max: 120, currency: 'USD' },
      accommodation: 'Hostels $20–40, Hotels $60–150',
      food: 'Street food $5–10, Restaurants $10–25',
      transportation: 'Excellent public transport $1–3 per ride',
    },
    safety: {
      rating: 9,
      soloFriendly: 9,
      femaleTravel: 9,
      description: 'Very safe with low crime rates, excellent for solo travelers.',
    },
    transportation: {
      local: ['Metro/Subway', 'Bus', 'Taxi', 'KTX Train'],
      apps: ['Kakao Map', 'Naver Map', 'Kakao T', 'Papago'],
    },
    reviews: { rating: 4.7, count: 850 },
  },
  mongolia: {
    budget: {
      level: 'budget',
      dailyCost: { min: 30, max: 80, currency: 'USD' },
      accommodation: 'Ger camps $15–30, Hotels $40–100',
      food: 'Local meals $3–8, Tourist restaurants $10–20',
      transportation: 'Tours and 4WD rentals recommended',
    },
    safety: {
      rating: 8,
      soloFriendly: 7.5,
      femaleTravel: 7.5,
      description: 'Generally safe, more caution needed in remote areas.',
    },
    transportation: {
      local: ['4WD Vehicle', 'Domestic Flights', 'Shared Taxi', 'Horse/Camel'],
      apps: ['UBCab', 'Maps.me (Offline)', 'Google Translate'],
    },
    reviews: { rating: 4.8, count: 650 },
  },
};
