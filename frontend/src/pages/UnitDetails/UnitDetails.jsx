import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import PaymentPopup from '../../components/PaymentPopup/PaymentPopup';
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
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    if (!unitId) {
      setError('Unit ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`${API_BASE_URL}/units/${unitId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Unit not found');
        return res.json();
      })
      .then((unitData) => {
        setUnit(unitData);

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

        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsSaved(saved.some((item) => item.id === Number(unitId)));
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

    const isFull = unit.current_occupants >= unit.maximum_occupants;

    if (!isFull) {
      setIsPaymentOpen(true);
      return;
    }

    setBookingStatus('booking');
    setBookingMessage('');

    try {
      const endpoint = `${API_BASE_URL}/units/${unit.id}/waitlist`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: user.id,
          userRole: user.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to join waitlist.');
      }

      setBookingStatus('success');
      setBookingMessage('You have been added to the waiting list.');
    } catch (error) {
      console.error('Failed to join waitlist:', error);
      setBookingStatus('error');
      setBookingMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    const response = await fetch(`${API_BASE_URL}/bookings/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unit_id: unit.id,
        student_id: user.id,
        amount: paymentDetails.amount,
        payment_method: paymentDetails.payment_method,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Payment failed. Please try again.');
    }

    setUnit(data.unit);
    setBookingStatus('success');
    setBookingMessage('Booking successful! Your deposit payment was recorded.');
  };

// Dynamic Status Calculation Helper
const getUnitStatus = (unitObj) => {
  if (!unitObj) return 'Vacant';

  const occupants = Number(unitObj.current_occupants || 0);
  const maxCapacity = Number(unitObj.maximum_occupants || 1);

  if (occupants >= maxCapacity) {
    return 'Occupied';
  }
  
  if (occupants > 0 && maxCapacity > 1) {
    return 'Partially Occupied';
  }

  return 'Vacant';
};

const statusText = getUnitStatus(unit);

const getStatusClass = (statusStr = '') => {
  const statusLower = statusStr.toLowerCase();
  if (statusLower.includes('partially')) return 'status-orange';
  if (statusLower.includes('occupied')) return 'status-red';
  return 'status-green';
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
              <span className="unit-badge shared-tag">
                👥 {unit.shared ? 'Shared' : 'Private'}
              </span>
              <span className={`unit-badge ${getStatusClass(unit.status)}`}>
                ● {unit.status || 'Vacant'}
              </span>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-btn share-btn" type="button">🔗 Share</button>
            <button 
              className={`action-btn save-btn ${isSaved ? 'saved' : ''}`} 
              onClick={handleToggleSave}
              type="button"
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
              <strong className={`occupied-tag ${getStatusClass(unit.status)}`}>
                📅 {unit.status || 'Vacant'}
              </strong>
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

      {/* PAYMENT POPUP MODAL */}
      <PaymentPopup
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={unit.deposit || unit.rent}
        unitName={`${unit.category} - Unit ${unit.id}`}
        onPaymentRequest={handlePaymentSubmit}
      />

      <Footer />
    </>
  );
}