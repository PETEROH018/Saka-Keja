import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UnitDetails.css';

export default function UnitDetails() {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Fetch specific unit details from Flask API
  useEffect(() => {
    fetch(`http://localhost:5000/units/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Unit not found');
        return res.json();
      })
      .then((data) => {
        setUnit(data);
        setLoading(false);
        
        // Check local storage for saved state
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsSaved(saved.some(item => item.id === data.id));
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle Save / Favorite Toggle
  const handleToggleSave = () => {
    if (!unit) return;
    const existing = JSON.parse(localStorage.getItem('favorites')) || [];
    let updated;

    if (isSaved) {
      updated = existing.filter(item => item.id !== unit.id);
    } else {
      updated = [...existing, unit];
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  if (loading) return <div className="unit-loading">Loading unit details...</div>;
  if (error || !unit) return <div className="unit-error">Error: {error || 'Unit not found'}</div>;

  // Image fallback handling
  const images = unit.imageURLS && unit.imageURLS.length > 0
    ? unit.imageURLS
    : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'];

return (
    <>
      <Navbar showSearch={true} />

      <main className="unit-details-container">
        {/* BREADCRUMB NAVIGATION */}
        <nav className="breadcrumb">
          <Link to="/home">Properties</Link> &gt; <span>{unit.apartment_name || 'Apartment'}</span> &gt; <span className="current">Unit {unit.id}</span>
        </nav>

        {/* HEADER TITLE & ACTIONS */}
        <header className="unit-header">
          <div>
            <h1>{unit.category} - Unit {unit.id}</h1>
            <div className="badge-group">
              <span className="unit-badge category">{unit.category}</span>
              <span className={`unit-badge status ${unit.status.toLowerCase()}`}>
                👥 Shared: {unit.status}
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

{/* IMAGE GALLERY GRID */}
        <section className="gallery-grid">
          <div className="main-image">
            <img src={images[0]} alt="Main Living Area" />
            <button className="video-btn">▶ Play Video</button>
          </div>
          <div className="side-images">
            {images.slice(1, 3).map((imgUrl, index) => (
              <div key={index} className="side-img-wrapper">
                <img src={imgUrl} alt={`Unit View ${index + 1}`} />
                {index === 1 && images.length > 3 && (
                  <button className="view-all-btn">
                    📷 View All {images.length} Photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

{/* CONTENT & SIDEBAR CARD GRID */}
        <div className="unit-content-grid">
          {/* LEFT CONTENT AREA */}
          <section className="main-info">
            {/* SPECS BAR */}
            <div className="specs-bar">
              <div className="spec-item">
                <span className="icon">🛏️</span>
                <div>
                  <strong>{unit.bedrooms}</strong>
                  <p>Bedrooms</p>
                </div>
              </div>

              <div className="spec-item">
                <span className="icon">🚿</span>
                <div>
                  <strong>{unit.bathrooms}</strong>
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
                  <strong>{unit.current_occupants} of {unit.maximum_occupants}</strong>
                  <p>Spots Filled</p>
                </div>
              </div>
            </div>

{/* DESCRIPTION */}
            <article className="description-box">
              <h2>About this Unit</h2>
              <p>{unit.description}</p>
            </article>
          </section>

          {/* RIGHT PRICING & BOOKING SIDEBAR */}
          <aside className="booking-card">
            <div className="price-header">
              <span className="price-label">Rent (Per Person)</span>
              <div className="price-value">
                <strong>KES {Number(unit.rent).toLocaleString()}</strong>
                <span>/ mo</span>
              </div>
            </div>

            <div className="deposit-row">
              <span>Security Deposit</span>
              <strong>KES {Number(unit.deposit).toLocaleString()}</strong>
            </div>

            <div className="availability-row">
              <span>Availability</span>
              <strong className="occupied-tag">📅 {unit.status}</strong>
            </div>

            {unit.shared && (
              <div className="roommate-box">
                <small>ROOMMATE MATCHING</small>
                <p>
                  {unit.maximum_occupants - unit.current_occupants} spot available in shared bedroom. Join existing verified students.
                </p>
              </div>
            )}

            <button className="primary-booking-btn">
              {unit.current_occupants >= unit.maximum_occupants ? 'Join Waitlist' : 'Book Now'}
            </button>

            <p className="no-charge-note">You won't be charged yet</p>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}