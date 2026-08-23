import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SearchResults.css';

export default function SearchResults() {
  const navigate = useNavigate();

  // Data & Loading States
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

  // Fetch Data from JSON Server (apartments endpoint)
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
        console.error('Error fetching db.json:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle Checkbox Toggles
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

  // Apply Filters Logic
  const handleApplyFilters = () => {
    let result = allApartments.filter(item => {
      const rent = item["monthly-expense-breakdown"]?.rent || 0;
      
      const matchMin = minRent ? rent >= Number(minRent) : true;
      const matchMax = maxRent ? rent <= Number(maxRent) : true;
      
      // Property type matching (e.g., 'bedsitter', 'single', 'one bedroom', 'two bed room')
      const matchType = propertyTypes.length > 0 
        ? propertyTypes.some(t => item.property_type.toLowerCase().includes(t.toLowerCase())) 
        : true;

      // Amenities check
      const matchWifi = amenities.includes('Wi-Fi Included') ? item["WiFi included"] : true;
      const matchWater = amenities.includes('Water Reliable') ? item["Water reliable"] : true;
      const matchSecurity = amenities.includes('Security Guard') ? item["Security Guard"] : true;

      return matchMin && matchMax && matchType && matchWifi && matchWater && matchSecurity;
    });

    setFilteredApartments(result);
  };

  // Sort Logic
  const getSortedApartments = (items) => {
    const sorted = [...items];
    if (sortBy === 'Price: Low to High') {
      return sorted.sort((a, b) => (a["monthly-expense-breakdown"]?.rent || 0) - (b["monthly-expense-breakdown"]?.rent || 0));
    }
    if (sortBy === 'Price: High to Low') {
      return sorted.sort((a, b) => (b["monthly-expense-breakdown"]?.rent || 0) - (a["monthly-expense-breakdown"]?.rent || 0));
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
            {[
              { label: 'Single Room', value: 'single' },
              { label: 'Bedsitter', value: 'bedsitter' },
              { label: '1 Bedroom', value: 'one bedroom' },
              { label: '2 Bedroom', value: 'two bed room' }
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
              <h1>{displayedApartments.length} homes found</h1>
              <p className="subtext">Showing available units</p>
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

          