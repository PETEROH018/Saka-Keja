import React from 'react'

const Location = async (locationName) => {
  if (!locationName || typeof locationName !== 'string') {
    throw new Error('Please provide a valid location name.');
  }

  const query = encodeURIComponent(locationName.trim());
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;

  
}

export default Location
