import React, { useState } from 'react';
import './SearchResults.css';

const initialProperties = [
  {
    id: 1,
    title: 'Sukari Heights Annex',
    price: 12000,
    matchScore: '94%',
    verified: true,
    location: 'Kahawa Sukari',
    walkTime: '12 min walk',
    propertyType: 'Hostel Room',
    amenities: ['Wi-Fi Included', 'Water Reliable'],
    fitNote: 'Great Fit: Fits your budget exactly and includes reliable Wi-Fi as requested.',
    beds: '1 Bed',
    bath: 'Private Bath',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Greenway Hostels',
    price: 9500,
    matchScore: '88%',
    verified: false,
    location: 'Kahawa Sukari',
    walkTime: '8 min walk',
    propertyType: 'Bedsitter',
    amenities: ['Water Reliable'],
    fitNote: 'Good Fit: Extremely close to campus. Note: Water is shared, not private.',
    beds: 'Bedsitter',
    bath: 'Paid Wi-Fi',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
  }
];

export default function SearchResults() {
  // Functional States
  const [mapView, setMapView] = useState(false);
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [propertyTypes, setPropertyTypes] = useState(['Hostel Room']);
  const [amenities, setAmenities] = useState(['Wi-Fi Included', 'Water Reliable']);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState(initialProperties);

  // Toggle Checkboxes
  const handleTypeChange = (type) => {
    setPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAmenityChange = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Clear All Functionality
  const handleClearAll = () => {
    setMapView(false);
    setMinRent('');
    setMaxRent('');
    setPropertyTypes([]);
    setAmenities([]);
    setProperties(initialProperties);
  };

  // Apply Filters Functionality
  const handleApplyFilters = () => {
    let filtered = initialProperties.filter(item => {
      const matchMin = minRent ? item.price >= Number(minRent) : true;
      const matchMax = maxRent ? item.price <= Number(maxRent) : true;
      const matchType = propertyTypes.length > 0 ? propertyTypes.includes(item.propertyType) : true;
      return matchMin && matchMax && matchType;
    });
    setProperties(filtered);
  };

  return (
    <div className="search-container">
      {/* LEFT SIDEBAR - FILTERS */}
      <aside className="filter-sidebar">
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="clear-btn" onClick={handleClearAll}>Clear all</button>
        </div>

        <div className="toggle-box">
          <span>🗺️ Map View</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={mapView} 
              onChange={() => setMapView(!mapView)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="filter-group">
          <label className="group-label">Monthly Rent (KES)</label>
          <div className="range-inputs">
            <input 
              type="number" 
              placeholder="Min" 
              value={minRent} 
              onChange={(e) => setMinRent(e.target.value)} 
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={maxRent} 
              onChange={(e) => setMaxRent(e.target.value)} 
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="group-label">Property Type</label>
          {['Bedsitter', '1 Bedroom', 'Hostel Room'].map(type => (
            <label key={type} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={propertyTypes.includes(type)} 
                onChange={() => handleTypeChange(type)} 
              /> {type}
            </label>
          ))}
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
          {['Wi-Fi Included', 'Water Reliable', 'Security Guard'].map(item => (
            <label key={item} className="checkbox-label">
              <input 
                type="checkbox" 
                checked={amenities.includes(item)} 
                onChange={() => handleAmenityChange(item)} 
              /> {item}
            </label>
          ))}
        </div>

        <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="results-main">
        <header className="results-header">
          <div>
            <h1>{properties.length} homes found</h1>
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

        <div className="cards-grid">
          {properties.length > 0 ? (
            properties.map((item) => (
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
                      <span className="amount">KES {item.price.toLocaleString()}</span>
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
                    <button className="details-btn" onClick={() => alert(`Opening details for ${item.title}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="no-results">No properties match your filter criteria.</p>
          )}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button 
            className="page-nav" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[1, 2, 3].map(num => (
            <button 
              key={num} 
              className={`page-num ${currentPage === num ? 'active' : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className="page-nav" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
            disabled={currentPage === 3}
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
}