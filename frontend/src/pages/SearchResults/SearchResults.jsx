import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SearchResults.css';

export default function SearchResults() {
  const navigate = useNavigate();

// Data & Load States
  const [allApartments, setAllApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States (Cleaned: Status and Property Type removed)
  const [location, setLocation] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  
  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default');

// Fetch Data from Backend API
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
        console.error('Error fetching apartments:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);