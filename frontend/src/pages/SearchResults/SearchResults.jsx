import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SearchResults.css';

export default function SearchResults() {
  const navigate = useNavigate();

  // Data & Load States
  const [allUnits, setAllUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search Location & Rent States
  const [locationSearch, setLocationSearch] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  // Unit Type / Category Checkbox States
  const [categoryFilters, setCategoryFilters] = useState({
    single: false,
    double: false,
    studio: false,
    bedsitter: false,
  });

  // Amenity Checkbox States
  const [hasKitchenette, setHasKitchenette] = useState(false);
  const [hasWardrobe, setHasWardrobe] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);

  // Pagination & Sorting States
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Best Match');

  // Fetch Units Data from Backend API
  useEffect(() => {
    fetch('http://localhost:5000/units')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch units');
        return res.json();
      })
      .then((data) => {
        setAllUnits(data);
        setFilteredUnits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching units:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Clear All Filters Handler
  const handleClearAll = (e) => {
    e.preventDefault();
    setMinRent('');
    setMaxRent('');
    setCategoryFilters({ single: false, double: false, studio: false, bedsitter: false });
    setHasKitchenette(false);
    setHasWardrobe(false);
    setHasBalcony(false);
    setFilteredUnits(allUnits);
    setCurrentPage(1);
  };

  // Apply Filter Logic Handler
  const handleApplyFilters = (e) => {
    if (e) e.preventDefault();
    let result = allUnits.filter((unit) => {
      const rent = Number(unit.rent || 0);

      // 1. Rent Range match
      const matchMinRent = minRent ? rent >= Number(minRent) : true;
      const matchMaxRent = maxRent ? rent <= Number(maxRent) : true;

      // 2. Unit Type / Category match
      const selectedCategories = Object.keys(categoryFilters).filter((k) => categoryFilters[k]);
      const matchCategory =
        selectedCategories.length > 0
          ? selectedCategories.some((cat) => (unit.category || '').toLowerCase().includes(cat))
          : true;

      // 3. Amenities match
      const matchKitchenette = hasKitchenette ? (unit.kitchenette || unit.has_kitchenette) : true;
      const matchWardrobe = hasWardrobe ? (unit.wardrobe || unit.has_wardrobe) : true;
      const matchBalcony = hasBalcony ? (unit.balcony || unit.has_balcony) : true;

      return (
        matchMinRent &&
        matchMaxRent &&
        matchCategory &&
        matchKitchenette &&
        matchWardrobe &&
        matchBalcony
      );
    });

    setFilteredUnits(result);
    setCurrentPage(1);
  };

  // Sort Logic Handler
  const getSortedUnits = (items) => {
    const sorted = [...items];
    if (sortBy === 'Price: Low to High') {
      return sorted.sort((a, b) => Number(a.rent) - Number(b.rent));
    }
    if (sortBy === 'Price: High to Low') {
      return sorted.sort((a, b) => Number(b.rent) - Number(a.rent));
    }
    return sorted;
  };

  const displayedUnits = getSortedUnits(filteredUnits);

  // Pagination Slicing (4 items per page for clean 2-column grid layout)
  const ITEMS_PER_PAGE = 4;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUnits = displayedUnits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(displayedUnits.length / ITEMS_PER_PAGE) || 1;

  // View Details Navigation Handler
  const handleViewDetails = (unit) => {
    if (unit.apartment_id) {
      navigate(`/apartments/${unit.apartment_id}/units/${unit.id}`);
    } else {
      navigate(`/unit-details/${unit.id}`);
    }
};
  return (
    <div className="search-page-bg">
      <Navbar showSearch={true} searchValue={locationSearch} setSearchValue={setLocationSearch} />

      <div className="search-container">
        {/* LEFT SIDEBAR FILTERS */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Filters</h2>
            <button type="button" className="clear-btn" onClick={handleClearAll}>
              Clear all
            </button>
          </div>

          {/* Monthly Rent (KES) Range */}
          <div className="filter-group">
            <label className="group-label">Monthly Rent (KES)</label>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
              />
              <span className="dash">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
              />
            </div>
          </div>

          {/* Unit Type / Category Checkboxes */}
          <div className="filter-group">
            <label className="group-label">Unit Type</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.single}
                onChange={(e) =>
                  setCategoryFilters({ ...categoryFilters, single: e.target.checked })
                }
              />
              Single Room
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.double}
                onChange={(e) =>
                  setCategoryFilters({ ...categoryFilters, double: e.target.checked })
                }
              />
              Double Room
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.studio}
                onChange={(e) =>
                  setCategoryFilters({ ...categoryFilters, studio: e.target.checked })
                }
              />
              Studio Apartment
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={categoryFilters.bedsitter}
                onChange={(e) =>
                  setCategoryFilters({ ...categoryFilters, bedsitter: e.target.checked })
                }
              />
              Bedsitter
            </label>
          </div>

          {/* Amenities Checkboxes */}
          <div className="filter-group">
            <label className="group-label">Amenities</label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={hasKitchenette}
                onChange={(e) => setHasKitchenette(e.target.checked)}
              />
              Kitchenette 🍳
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={hasWardrobe}
                onChange={(e) => setHasWardrobe(e.target.checked)}
              />
              Wardrobe 🚪
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={hasBalcony}
                onChange={(e) => setHasBalcony(e.target.checked)}
              />
              Balcony 🌅
            </label>
          </div>

          <button type="button" className="apply-btn" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="results-main">
          <header className="results-header">
            <div>
              <h1>{displayedUnits.length} units found</h1>
              <p className="subtext">Select a unit to view details and options</p>
            </div>
            <div className="sort-box">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Best Match">Best Match</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </header>

          {/* 2-COLUMN CARDS GRID */}
          {loading ? (
            <div className="no-results">Loading available units...</div>
          ) : error ? (
            <div className="no-results">Error loading data: {error}</div>
          ) : (
            <div className="cards-grid-two-col">
              {paginatedUnits.length > 0 ? (
                paginatedUnits.map((item, index) => {
                  const image =
                    (item.imageURLS && item.imageURLS.length > 0 ? item.imageURLS[0] : null) ||
                    (item.image_Urls && item.image_Urls.length > 0 ? item.image_Urls[0] : null);

                  return (
                    <article key={item.id} className="property-card">
                      <div className="card-image-wrapper">
                        {image ? (
                          <img src={image} alt={item.category} />
                        ) : (
                          <div className="placeholder-brand">
                            <h2>Saka Keja</h2>
                          </div>
                        )}
                        
                      </div>

                      <div className="card-body">
                        <div className="card-title-row">
                          <span className="occupancy-tag">
                            📍 {item.shared ? 'Shared' : 'Private'}
                          </span>
                          <div className="price-tag">
                            <span className="amount">
                              KSh {Number(item.rent).toLocaleString()}
                            </span>
                            <span className="period">/ month</span>
                          </div>
                        </div>

                        <p className="description-text">{item.description}</p>

                        <div className="fit-note">
                          <span className="check-icon">✔</span>
                          <p>
                            Fits your preferences: {item.category} •{' '}
                            {item.shared ? 'Shared Space' : 'Private Space'}
                          </p>
                        </div>

                        <div className="card-footer">
                          <div className="specs">
                            <span>🛏️ {item.bedrooms || 1} Bedroom</span>
                            <span>🚿 {item.bathrooms || 1} Bathroom</span>
                          </div>

                          <button
                            type="button"
                            className="details-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(item);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="no-results">No units match your filter criteria.</p>
              )}
            </div>
          )}

          {/* PAGINATION NUMERIC BAR */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="page-nav"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  type="button"
                  key={num}
                  className={`page-num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="page-nav"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}