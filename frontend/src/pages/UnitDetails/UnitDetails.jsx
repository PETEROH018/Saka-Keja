import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './UnitDetails.css';
import { API_BASE_URL } from '../../config/api';

export default function UnitDetails() {
  // Extract parameters from route
  const params = useParams();
  const unitId = params.unitId || params.id;
  const apartmentId = params.apartmentId;

  const [unit, setUnit] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
