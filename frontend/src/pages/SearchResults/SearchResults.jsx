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
<div className="filter-group">
          <label className="group-label">Monthly Rent (KES)</label>
          <div className="range-inputs">
            <input type="number" placeholder="Min" />
            <span>-</span>
            <input type="number" placeholder="Max" />
          </div>
        </div>

        <div className="filter-group">
          <label className="group-label">Property Type</label>
          <label className="checkbox-label">
            <input type="checkbox" /> Bedsitter
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> 1 Bedroom
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked /> Hostel Room
          </label>
        </div>

        <div className="filter-group">
          <label className="group-label">Distance from Campus</label>
          <select className="select-input">
            <option>Under 15 mins walk</option>
            <option>Under 10 mins walk</option>
            <option>Under 5 mins walk</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="group-label">Amenities</label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked /> Wi-Fi Included
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked /> Water Reliable
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> Security Guard
          </label>
        </div>

        <button className="apply-btn">Apply Filters</button>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="results-main">
        {/* TOP SUMMARY BAR */}
        <header className="results-header">
          <div>
            <h1>126 homes found</h1>
            <p className="subtext">in Kahawa Sukari, showing available units</p>
          </div>
          <div className="sort-box">
            <span>Sort by:</span>
            <select>
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </header>

        {/* PROPERTY LIST */}
        <div className="cards-grid">
          {sampleProperties.map((item) => (
            <article key={item.id} className="property-card">
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.title} />
                <span className="match-badge">✪ {item.matchScore} Match</span>
                {item.verified && <span className="verified-badge">🛡️ Verified</span>}
              </div>

              <div className="card-body">
                <div className="card-title-row">
                  <h3>{item.title}</h3>
                  <div className="price-tag">
                    <span className="amount">KES {item.price}</span>
                    <span className="period">/ month</span>
                  </div>
                </div>

                <p className="location-text">📍 {item.location} · {item.walkTime}</p>

                <div className="fit-note">
                  <span>✔️</span>
                  <p>{item.fitNote}</p>
                </div>

                <div className="card-footer">
                  <div className="specs">
                    <span>🛏️ {item.beds}</span>
                    <span>🚿 {item.bath}</span>
                  </div>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button className="page-nav">&lt;</button>
          <button className="page-num active">1</button>
          <button className="page-num">2</button>
          <button className="page-num">3</button>
          <button className="page-nav">&gt;</button>
        </div>
      </main>
    </div>
  );
}