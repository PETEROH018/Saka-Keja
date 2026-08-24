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