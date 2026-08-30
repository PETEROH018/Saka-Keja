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

  // Filter States
  const [mapView, setMapView] = useState(false);
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default');

  // Fetch Data from Flask Backend API
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

  // Fetch Data from Flask Backend API
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

  // Handle Checkboxes
  const handleTypeChange = (type) => {
    setPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAmenityChange = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Clear All Filters
  const handleClearAll = () => {
    setMapView(false);
    setMinRent('');
    setMaxRent('');
    setPropertyTypes([]);
    setAmenities([]);
    setFilteredApartments(allApartments);
  };