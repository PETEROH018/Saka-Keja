import React, { useState, useEffect } from 'react';

export default function ManagerEditProfile({ ownerId = 1 }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch(`/api/apartment-owners/${ownerId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          full_name: data.full_name || '',
          email: data.email || '',
          phone_number: data.phone_number || ''
        });
      })
      .catch((err) => console.error("Error fetching manager profile:", err));
  }, [ownerId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/apartment-owners/${ownerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Manager profile updated successfully!');
      } else {
        setStatusMessage('Failed to update manager profile.');
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage('An error occurred while saving.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Manager Profile</h2>
      {statusMessage && <p className="mb-4 text-sm text-emerald-400">{statusMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border border-zinc-700 bg-zinc-800 rounded p-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-zinc-700 bg-zinc-800 rounded p-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border border-zinc-700 bg-zinc-800 rounded p-2 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}