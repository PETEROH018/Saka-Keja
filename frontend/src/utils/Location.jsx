import React from 'react'

const Location = async (locationName) => {
  if (!locationName || typeof locationName !== 'string') {
    throw new Error('Please provide a valid location name.');
  }

  const query = encodeURIComponent(locationName.trim());
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Saka-Keja/1.0 (ndubidarrel@gmail.com)',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok (Status: ${response.status})`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`No coordinates found for location: "${locationName}"`);
    }

    
  } catch (error) {
    console.error('Error fetching location coordinates:', error.message);
    throw error;
  }
}

export default Location
