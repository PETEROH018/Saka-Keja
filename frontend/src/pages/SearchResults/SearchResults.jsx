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
  const [location, setLocation] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [hasWardrobe, setHasWardrobe] = useState(false); // NEW: Wardrobe filter state
  
  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default');

  // Fetch Data from Backend API
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

  // Clear All Filters
  const handleClearAll = () => {
    setLocation('');
    setMinRent('');
    setMaxRent('');
    setBedrooms('');
    setBathrooms('');
    setHasWardrobe(false);
    setFilteredApartments(allApartments);
  };

  // Helper to resolve property rent
  const getPropertyRent = (item) => {
    if (item["monthly-expense-breakdown"]?.rent) {
      return Number(item["monthly-expense-breakdown"].rent);
    }
    if (item.units && item.units.length > 0) {
      return Math.min(...item.units.map(u => u.rent));
    }
    return 0;
  };

  // Apply Filter Logic (Location, Rent Range, Bedrooms, Bathrooms, Wardrobe)
  const handleApplyFilters = () => {
    let result = allApartments.filter(item => {
      const rent = getPropertyRent(item);

      // 1. Location match
      const matchLocation = location 
        ? (item.location || '').toLowerCase().includes(location.toLowerCase().trim()) 
        : true;

      // 2. Rent Range match
      const matchMinRent = minRent ? rent >= Number(minRent) : true;
      const matchMaxRent = maxRent ? rent <= Number(maxRent) : true;

      // 3. Bedrooms match
      const matchBedrooms = bedrooms 
        ? Number(item.bedrooms) === Number(bedrooms) 
        : true;

      // 4. Bathrooms match
      const matchBathrooms = bathrooms 
        ? Number(item.bathrooms) === Number(bathrooms) 
        : true;

      // 5. Wardrobe match (Checks apartment or unit level wardrobe attributes/amenities)
      const matchWardrobe = hasWardrobe
        ? item.has_wardrobe === true || 
          item.wardrobe === true || 
          (item.units && item.units.some(u => u.has_wardrobe || u.wardrobe))
        : true;

      return matchLocation && matchMinRent && matchMaxRent && matchBedrooms && matchBathrooms && matchWardrobe;
    });

    setFilteredApartments(result);
    setCurrentPage(1);
  };

  // Sort Logic
  const getSortedApartments = (items) => {
    const sorted = [...items];
    if (sortBy === 'Price: Low to High') {
      return sorted.sort((a, b) => getPropertyRent(a) - getPropertyRent(b));
    }
    if (sortBy === 'Price: High to Low') {
      return sorted.sort((a, b) => getPropertyRent(b) - getPropertyRent(a));
    }
    return sorted;
  };

  const displayedApartments = getSortedApartments(filteredApartments);

  // Pagination Slicing
  const ITEMS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApartments = displayedApartments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(displayedApartments.length / ITEMS_PER_PAGE) || 1;

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

          {/* Location Filter */}
          <div className="filter-group">
            <label className="group-label">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Kileleshwa, Juja" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className="text-filter-input"
            />
          </div>

          {/* Rent Range Filter */}
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

          {/* Bedrooms & Bathrooms Filters */}
          <div className="filter-group two-col">
            <div>
              <label className="group-label">Bedrooms</label>
              <input 
                type="number" 
                placeholder="Any" 
                value={bedrooms} 
                onChange={(e) => setBedrooms(e.target.value)} 
                className="number-filter-input"
              />
            </div>
            <div>
              <label className="group-label">Bathrooms</label>
              <input 
                type="number" 
                placeholder="Any" 
                value={bathrooms} 
                onChange={(e) => setBathrooms(e.target.value)} 
                className="number-filter-input"
              />
            </div>
          </div>

          {/* NEW: Amenities / Features Filter (Wardrobe) */}
          <div className="filter-group">
            <label className="group-label">Features & Amenities</label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={hasWardrobe} 
                onChange={(e) => setHasWardrobe(e.target.checked)} 
              /> Includes Wardrobe 🚪
            </label>
          </div>

          <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className="results-main">
          <header className="results-header">
            <div>
              <h1>{displayedApartments.length} properties found</h1>
              <p className="subtext">Select a property to view details</p>
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
              {paginatedApartments.length > 0 ? (
                paginatedApartments.map((item) => {
                  const rent = getPropertyRent(item);
                  const firstImage = (item.imageURLs && item.imageURLs.length > 0 ? item.imageURLs[0] : null) || 
                                     (item.image_Urls && item.image_Urls.length > 0 ? item.image_Urls[0] : null) || 
                                     'https://via.placeholder.com/800x600';

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
                              {rent > 0 ? `KES ${rent.toLocaleString()}` : 'Contact for Price'}
                            </span>
                            {rent > 0 && <span className="period">/ month</span>}
                          </div>
                        </div>

                        <p className="location-text">📍 {item.location}</p>

                        <div className="fit-note">
                          <span>✔️</span>
                          <p>{item.description}</p>
                        </div>

                        <div className="card-footer">
                          <div className="specs">
                            {item.bedrooms && <span>🛏️ {item.bedrooms} Bed</span>}
                            {item.bathrooms && <span>🚿 {item.bathrooms} Bath</span>}
                          </div>
                          
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

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-nav" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
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
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}