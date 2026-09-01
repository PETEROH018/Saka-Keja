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
  const { user, token } = useAuth();

  const [unit, setUnit] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const checkSavedStatus = async () => {
    if (!user?.id || !unitId) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/students/${user.id}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const favorites = await response.json();

      const exists = favorites.some(
        (favorite) => favorite.id === Number(unitId)
      );

      setIsSaved(exists);

    } catch (error) {
      console.error(
        "Failed checking favorite status:",
        error
      );
    }
  };
  const [bookingStatus, setBookingStatus] = useState(null); // 'idle' | 'booking' | 'success' | 'error'
  const [bookingMessage, setBookingMessage] = useState('');

  useEffect(() => {
    if (!unitId) {
      setError('Unit ID is missing');
      setLoading(false);
      return;
    }

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
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apartmentId, unitId]);

  useEffect(() => {
    checkSavedStatus();
  }, [user?.id, unitId]);

  const handleToggleSave = async () => {

    if (!user?.id) {
      alert("Please login to save properties");
      navigate('/auth');
      return;
    }

    if (!unit) return;

    try {

      const response = await fetch(
        `${API_BASE_URL}/students/${user.id}/units/${unit.id}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }


      const data = await response.json();

      setIsSaved(data.favorite);


    } catch (error) {

      console.error(
        "Favorite update failed:",
        error
      );

    }

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
