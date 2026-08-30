import React, { useState, useEffect } from 'react';

export default function StudentEditProfile({ studentId = 1 }) {
  const [formData, setFormData] = useState({
    full_name: '',
    university: '',
    bio: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch existing data when the component mounts
  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          full_name: data.full_name || '',
          university: data.university || '',
          bio: data.bio || ''
        });
      })
      .catch((err) => console.error("Error fetching student profile:", err));
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Profile updated successfully!');
      } else {
        setStatusMessage('Failed to update profile.');
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage('An error occurred while saving.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Student Profile</h2>
      {statusMessage && <p className="mb-4 text-sm text-emerald-600">{statusMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded p-2 rows-3"
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