import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SavedProperties.css';

export default function SavedProperties() {
  const [favorites, setFavorites] = useState([]);

  // Fetch saved properties from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedData);
  }, []);

  // Remove property from favorites and update localStorage
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

return (
    <>
      <Navbar showSearch={true} />
      
      <main className="saved-container">
        <header className="saved-header">
          <h1>Saved Properties</h1>
          <p>Your shortlisted homes, ready for review.</p>
        </header>

        {favorites.length > 0 ? (
          <div className="saved-grid">
            {favorites.map((item) => {
              const rent = item["monthly-expense-breakdown"]?.rent || item.price || 0;
              const image = item.image_Urls?.[0] || item.image || 'https://via.placeholder.com/800x600';

return (
                <article key={item.id} className="saved-card">
                  <div className="card-image-wrapper">
                    <img src={image} alt={item.name || item.title} />
                    
                    {/* Floating Heart Icon to Remove */}
                    <button 
                      className="heart-btn" 
                      onClick={() => handleRemoveFavorite(item.id)}
                      title="Remove from saved"
                    >
                      💜
                    </button>

                    {/* Dynamic Status Badges matching design */}
                    <div className="badge-row">
                      {item.isVerified && <span className="badge verified">Verified</span>}
                      {item.available !== false && <span className="badge available">Available</span>}
                      {item.roommateWanted && <span className="badge roommate">Roommate Wanted</span>}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-title-row">
                      <h3>{item.name || item.title}</h3>
                      <div className="price-tag">
                        <span className="amount">KES {Number(rent).toLocaleString()}</span>
                        <span className="period">/mo</span>
                      </div>
                    </div>

                    <p className="location-text">📍 {item.location}</p>

                    <div className="card-footer-specs">
                      <span>🛏️ {item.beds || item.property_type || 'Bed'}</span>
                      <span>🚿 {item.bathrooms ? `${item.bathrooms} Bath` : item.bath || 'Bath'}</span>
                      <span>📶 {item["WiFi included"] ? 'Inc.' : 'Paid'}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-saved">
            <p>You have no saved properties yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}