import React from 'react';
import './SearchResults.css';

const sampleProperties = [
  {
    id: 1,
    title: 'Sukari Heights Annex',
    price: '12,000',
    matchScore: '94%',
    verified: true,
    location: 'Kahawa Sukari',
    walkTime: '12 min walk',
    fitNote: 'Great Fit: Fits your budget exactly and includes reliable Wi-Fi as requested.',
    beds: '1 Bed',
    bath: 'Private Bath',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  },
{
    id: 2,
    title: 'Greenway Hostels',
    price: '9,500',
    matchScore: '88%',
    verified: false,
    location: 'Kahawa Sukari',
    walkTime: '8 min walk',
    fitNote: 'Good Fit: Extremely close to campus. Note: Water is shared, not private.',
    beds: 'Bedsitter',
    bath: 'Paid Wi-Fi',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
  }
];

export default function SearchResults() {
  return (
    <div className="search-container">
      {/* LEFT SIDEBAR - FILTERS */}
      <aside className="filter-sidebar">
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="clear-btn">Clear all</button>
        </div>

        <div className="toggle-box">
          <span>🗺️ Map View</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>