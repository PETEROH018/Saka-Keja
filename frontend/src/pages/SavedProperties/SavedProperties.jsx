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