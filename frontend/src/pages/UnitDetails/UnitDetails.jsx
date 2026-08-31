import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UnitDetails.css';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../../context/useAuth';


export default function UnitDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const unitId = params.unitId ?? params.id;
  const apartmentId = params.apartmentId ?? params.apartment_id;
  const { user } = useAuth();

  const [unit, setUnit] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // 'idle' | 'booking' | 'success' | 'error'
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    if (!unitId) {
      setError('Unit ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`${API_BASE_URL}/units/${unitId}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Unit not found');
        }

        const unitData = await res.json();
        setUnit(unitData);

        const apartmentIdToLoad = apartmentId ?? unitData.apartment_id;
        if (!apartmentIdToLoad) {
          setApartment(null);
          return;
        }

        const apartmentRes = await fetch(`${API_BASE_URL}/apartments/${apartmentIdToLoad}`);
        if (!apartmentRes.ok) {
          throw new Error('Apartment not found');
        }

        const apartmentData = await apartmentRes.json();
        setApartment(apartmentData);

        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsSaved(saved.some((item) => item.id === unitData.id));
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
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

  const handleBookOrJoinWaitlist = async () => {
    if (!user?.id) {
      alert('Please log in to book a unit or join the waiting list.');
      navigate('/auth');
      return;
    }

    if (user.role !== 'student') {
      alert('Only students can book units or join the waitlist.');
      return;
    }

    if (!unit) return;

    const action = unit.current_occupants >= unit.maximum_occupants ? 'waitlist' : 'book';
    setBookingStatus('booking');
    setBookingMessage('');

    try {
      const endpoint = `${API_BASE_URL}/units/${unit.id}/${action}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: user.id,
          userRole: user.role,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.error || `Unable to ${action} this unit.`);
      }

      setBookingStatus('success');
      setBookingMessage(
        action === 'book'
          ? 'Booking successful! Your unit has been reserved.'
          : 'You have been added to the waiting list.'
      );

      if (action === 'book') {
        setUnit((currentUnit) => ({
          ...currentUnit,
          current_occupants: Number(currentUnit.current_occupants || 0) + 1,
        }));
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
      setBookingStatus('error');
      setBookingMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (loading) return <div className="unit-loading">Loading unit details...</div>;
  if (error || !unit) return <div className="unit-error">Error: {error || 'Unit not found'}</div>;

  const images = unit.imageURLS && unit.imageURLS.length > 0
    ? unit.imageURLS
    : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'];

  return (
    <>
      <Navbar showSearch={true} />

      <main className="unit-details-container">
        {/* BREADCRUMB WITH DIRECT LINK BACK TO PARENT APARTMENT */}
        <nav className="breadcrumb">
          <Link to="/search">Properties</Link> &gt;{' '}
          <Link to={`/available-units/${apartmentId}`}>
            {apartment?.name || `Apartment ${apartmentId}`}
          </Link>{' '}
          &gt; <span className="current">Unit {unit.id}</span>
        </nav>

        {/* HEADER TITLE & ACTIONS */}
        <header className="unit-header">
          <div>
            <h1>
              {unit.category} - Unit {unit.id}
            </h1>
            <p className="apartment-location-subtext">
              📍 Located in <strong>{apartment?.name}</strong>, {apartment?.location}
            </p>
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

            <article className="description-box">
              <h2>About this Unit</h2>
              <p>{unit.description}</p>
            </article>
          </section>

          {/* BOOKING CARD */}
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

            <button
              className="primary-booking-btn"
              onClick={handleBookOrJoinWaitlist}
              disabled={bookingStatus === 'booking'}
              type="button"
            >
              {bookingStatus === 'booking'
                ? 'Processing...'
                : unit.current_occupants >= unit.maximum_occupants
                  ? 'Join Waitlist'
                  : 'Book Now'}
            </button>

            {bookingMessage && (
              <p
                className={`booking-status ${bookingStatus === 'error' ? 'error' : 'success'}`}
                role="status"
              >
                {bookingMessage}
              </p>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}