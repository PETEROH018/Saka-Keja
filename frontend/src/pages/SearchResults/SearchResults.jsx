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

// Clear All Filters
  const handleClearAll = () => {
    setLocation('');
    setMinRent('');
    setMaxRent('');
    setBedrooms('');
    setBathrooms('');
    setFilteredApartments(allApartments);
  };

// Helper to resolve property rent
  const getPropertyRent = (item) => {
    if (item["monthly-expense-breakdown"]?.rent) {
      return Number(item["monthly-expense-breakdown"].rent);
    }
    if (item.units && item.units.length > 0) {
      return Math.min(...item.units.map(u => u.rent));
    }
    return 0;
  };

// Apply Filter Logic (Location, Rent Range, Bedrooms, Bathrooms)
  const handleApplyFilters = () => {
    let result = allApartments.filter(item => {
      const rent = getPropertyRent(item);

      // 1. Location match
      const matchLocation = location 
        ? (item.location || '').toLowerCase().includes(location.toLowerCase().trim()) 
        : true;

      // 2. Rent Range match
      const matchMinRent = minRent ? rent >= Number(minRent) : true;
      const matchMaxRent = maxRent ? rent <= Number(maxRent) : true;

// 3. Bedrooms match
      const matchBedrooms = bedrooms 
        ? Number(item.bedrooms) === Number(bedrooms) 
        : true;

      // 4. Bathrooms match
      const matchBathrooms = bathrooms 
        ? Number(item.bathrooms) === Number(bathrooms) 
        : true;

      return matchLocation && matchMinRent && matchMaxRent && matchBedrooms && matchBathrooms;
    });

    setFilteredApartments(result);
    setCurrentPage(1);
  };