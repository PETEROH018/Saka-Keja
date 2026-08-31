import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UnitDetails.css';
import { API_BASE_URL } from '../../config/api';

export default function UnitDetails() {
  // Extract parameters from route
  const params = useParams();
  const unitId = params.unitId || params.id;
  const apartmentId = params.apartmentId;

  const [unit, setUnit] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Fetch Unit details
    fetch(`${API_BASE_URL}/units/${unitId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Unit not found');
        return res.json();
      })
      .then((unitData) => {
        setUnit(unitData);

// Fetch parent apartment details if apartmentId or unit.apartment_id exists
        const parentApartmentId = apartmentId || unitData.apartment_id;
        if (parentApartmentId) {
          return fetch(`${API_BASE_URL}/apartments/${parentApartmentId}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((aptData) => {
              setApartment(aptData);
            });
        }
      })
      .then(() => {
        setLoading(false);

// Sync with local storage favorites
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsSaved(saved.some((item) => item.id === Number(unitId)));
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apartmentId, unitId]);

const handleToggleSave = () => {
    if (!unit) return;
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    let updated;

    if (isSaved) {
      updated = existing.filter((item) => item.id !== unit.id);
    } else {
      updated = [...existing, unit];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  if (loading) return <div className="unit-loading">Loading unit details...</div>;
  if (error || !unit) return <div className="unit-error">Error: {error || 'Unit not found'}</div>;

  const images =
    unit.imageURLS && unit.imageURLS.length > 0
      ? unit.imageURLS
      : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'];

return (
    <>
      <Navbar showSearch={true} />

      <main className="unit-details-container">
        {/* BREADCRUMB */}
        <nav className="breadcrumb">
          <Link to="/search">Properties</Link> &gt;{' '}
          {apartment ? (
            <Link to={`/available-units/${apartment.id}`}>
              {apartment.name}
            </Link>
          ) : (
            <span>Apartment</span>
          )}{' '}
          &gt; <span className="current">Unit {unit.id}</span>
        </nav>

        {/* HEADER TITLE & ACTIONS */}
        <header className="unit-header">
          <div>
            <h1>
              {unit.category} - Unit {unit.id}
            </h1>
            <p className="apartment-location-subtext">
              📍 Located in <strong>{apartment?.name || 'Apartment Complex'}</strong>, {apartment?.location || 'Nairobi'}
            </p>
            <div className="badge-group">
              <span className="unit-badge category">{unit.category}</span>
              <span className={`unit-badge status ${(unit.status || 'available').toLowerCase()}`}>
                👥 {unit.shared ? 'Shared' : 'Private'}
              </span>
              <span className="unit-badge occupancy">
                {unit.current_occupants >= unit.maximum_occupants ? 'Occupied (Waitlist)' : 'Available'}
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-btn share-btn">🔗 Share</button>
            <button 
              className={`action-btn save-btn ${isSaved ? 'saved' : ''}`} 
              onClick={handleToggleSave}
            >
              {isSaved ? '💜 Saved' : '🤍 Save'}
            </button>
          </div>
        </header>

        {/* GALLERY */}
        <section className="gallery-grid">
          <div className="main-image">
            <img src={images[0]} alt="Main Living Area" />
            <button className="video-btn">▶ Play Video</button>
          </div>
          <div className="side-images">
            {images.slice(1, 3).map((imgUrl, index) => (
              <div key={index} className="side-img-wrapper">
                <img src={imgUrl} alt={`Unit View ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* DETAILS GRID */}
        <div className="unit-content-grid">
          <section className="main-info">
            <div className="specs-bar">
              <div className="spec-item">
                <span className="icon">🛏️</span>
                <div>
                  <strong>{unit.bedrooms || 1}</strong>
                  <p>Bedrooms</p>
                </div>
              </div>

              <div className="spec-item">
                <span className="icon">🚿</span>
                <div>
                  <strong>{unit.bathrooms || 1}</strong>
                  <p>Bathrooms</p>
                </div>
              </div>

              <div className="spec-item">
                <span className="icon">📐</span>
                <div>
                  <strong>{unit.size || 'N/A'}</strong>
                  <p>Sq Ft</p>
                </div>
              </div>

              <div className="spec-item">
                <span className="icon">👤</span>
                <div>
                  <strong>{unit.current_occupants || 0} of {unit.maximum_occupants || 1}</strong>
                  <p>Spots Filled</p>
                </div>
              </div>
            </div>

            <article className="description-box">
              <h2>About this Unit</h2>
              <p>{unit.description || 'No description available for this unit.'}</p>
            </article>
          </section>

          {/* BOOKING CARD */}
          <aside className="booking-card">
            <div className="price-header">
              <span className="price-label">Rent</span>
              <div className="price-value">
                <strong>KES {Number(unit.rent || 0).toLocaleString()}</strong>
                <span>/ mo</span>
              </div>
            </div>

            <div className="deposit-row">
              <span>Security Deposit</span>
              <strong>KES {Number(unit.deposit || unit.rent || 0).toLocaleString()}</strong>
            </div>

            <div className="availability-row">
              <span>Availability</span>
              <strong className="occupied-tag">📅 {unit.status || 'Available'}</strong>
            </div>

            <button className="primary-booking-btn">
              {unit.current_occupants >= unit.maximum_occupants ? 'Join Waitlist' : 'Book Now'}
            </button>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
