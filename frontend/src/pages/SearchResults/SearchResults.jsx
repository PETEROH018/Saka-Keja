import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SearchResults.css';

export default function SearchResults() {
  const navigate = useNavigate();

  // Data & Load States
  const [allApartments, setAllApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [mapView, setMapView] = useState(false);
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default');

  // Fetch Data from Flask Backend API
  useEffect(() => {
    fetch('http://localhost:5000/apartments')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch apartments');
        return res.json();
      })
      .then((data) => {
        setAllApartments(data);
        setFilteredApartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching apartments:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch Data from Flask Backend API
  useEffect(() => {
    fetch('http://localhost:5000/apartments')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch apartments');
        return res.json();
      })
      .then((data) => {
        setAllApartments(data);
        setFilteredApartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching apartments:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle Checkboxes
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

  // Clear All Filters
  const handleClearAll = () => {
    setMapView(false);
    setMinRent('');
    setMaxRent('');
    setPropertyTypes([]);
    setAmenities([]);
    setFilteredApartments(allApartments);
  };

  // Apply Filters based on Flask Apartment + Units schema
  const handleApplyFilters = () => {
    let result = allApartments.filter(item => {
      // Get lowest unit rent or default to 0
      const lowestRent = item.units && item.units.length > 0 
        ? Math.min(...item.units.map(u => u.rent)) 
        : 0;

      const matchMin = minRent ? lowestRent >= Number(minRent) : true;
      const matchMax = maxRent ? lowestRent <= Number(maxRent) : true;
      
      // Property type matching against Flask field 'type'
      const matchType = propertyTypes.length > 0 
        ? propertyTypes.some(t => (item.type || '').toLowerCase().includes(t.toLowerCase())) 
        : true;

      return matchMin && matchMax && matchType;
    });

    setFilteredApartments(result);
  };

  // Sort Logic based on unit rents
  const getSortedApartments = (items) => {
    const sorted = [...items];

    const getMinRent = (apt) => {
      if (!apt.units || apt.units.length === 0) return 0;
      return Math.min(...apt.units.map(u => u.rent));
    };

    if (sortBy === 'Price: Low to High') {
      return sorted.sort((a, b) => getMinRent(a) - getMinRent(b));
    }
    if (sortBy === 'Price: High to Low') {
      return sorted.sort((a, b) => getMinRent(b) - getMinRent(a));
    }
    return sorted;
  };

  const displayedApartments = getSortedApartments(filteredApartments);

  return (
    <>
      <Navbar showSearch={true} />
      <div className="search-container">
        {/* LEFT SIDEBAR - FILTERS */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="clear-btn" onClick={handleClearAll}>Clear all</button>
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
            {[
              { label: 'Single Room', value: 'single' },
              { label: 'Bedsitter', value: 'bedsitter' },
              { label: '1 Bedroom', value: 'one bedroom' },
              { label: '2 Bedroom', value: 'two bedroom' }
            ].map(type => (
              <label key={type.value} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={propertyTypes.includes(type.value)} 
                  onChange={() => handleTypeChange(type.value)} 
                /> {type.label}
              </label>
            ))}
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
              <h1>{displayedApartments.length} properties found</h1>
              <p className="subtext">Select a property to view available units</p>
            </div>
            <div className="sort-box">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </header>

          {/* DYNAMIC CONTENT GRID */}
          {loading ? (
            <div className="no-results">Loading available properties...</div>
          ) : error ? (
            <div className="no-results">Error loading data: {error}</div>
          ) : (
            <div className="cards-grid">
              {displayedApartments.length > 0 ? (
                displayedApartments.map((item) => {
                  // Fallback pricing calculation based on nested units
                  const lowestRent = item.units && item.units.length > 0 
                    ? Math.min(...item.units.map(u => u.rent)) 
                    : 0;

                  const firstImage = item.imageURLs && item.imageURLs.length > 0 
                    ? item.imageURLs[0] 
                    : 'https://via.placeholder.com/800x600';

                  const nearbyNote = item.nearby_facilities && item.nearby_facilities.length > 0
                    ? `${item.nearby_facilities[0].title} (${item.nearby_facilities[0].distance})`
                    : '';

                  return (
                    <article key={item.id} className="property-card">
                      <div className="card-image-wrapper">
                        <img src={firstImage} alt={item.name} />
                        {item.isVerified && <span className="verified-badge">🛡️ Verified</span>}
                      </div>

                      <div className="card-body">
                        <div className="card-title-row">
                          <h3>{item.name}</h3>
                          <div className="price-tag">
                            <span className="amount">
                              {lowestRent > 0 ? `KES ${lowestRent.toLocaleString()}` : 'Contact for Price'}
                            </span>
                            {lowestRent > 0 && <span className="period">/ month</span>}
                          </div>
                        </div>

                        <p className="location-text">📍 {item.location} {nearbyNote ? `· ${nearbyNote}` : ''}</p>

                        <div className="fit-note">
                          <span>✔️</span>
                          <p>{item.description}</p>
                        </div>

                        <div className="card-footer">
                          <div className="specs">
                            <span>🏢 {item.type}</span>
                            <span>🚪 {item.units ? item.units.length : 0} Units</span>
                          </div>
                          
                          {/* DYNAMIC ROUTE NAVIGATION TO APARTMENT UNITS */}
                          <button 
                            className="details-btn" 
                            onClick={() => navigate(`/apartment-details/${item.id}`)}
                          >
                            View Units
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="no-results">No properties match your filter criteria.</p>
              )}
            </div>
          )}

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
      <Footer />
    </>
  );
}