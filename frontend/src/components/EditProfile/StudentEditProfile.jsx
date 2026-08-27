import React, { useState, useEffect } from 'react';

const StudentEditProfile = ({ studentId = 1, onSaveSuccess }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form state structure
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+254 712 345 678',
    university: 'Strathmore University',
    yearOfStudy: '3rd Year',
    studentNumber: '123456',
    expectedGraduation: 'December 2025',
    profileImage: 'https://via.placeholder.com/80'
  });

  // Fetch student details dynamically on component mount
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/students/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile details');
        return res.json();
      })
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          fullName: data.name || '',
          email: data.email || ''
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
        setLoading(false);
      });
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file)
      }));
    }
  };

  // Submit PATCH request to Flask backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const payload = {
      name: formData.fullName,
      email: formData.email
    };

    fetch(`http://127.0.0.1:5000/students/${studentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then((data) => {
        setIsSubmitting(false);
        setStatusMessage('Profile updated successfully!');
        if (onSaveSuccess) onSaveSuccess(data);
      })
      .catch((err) => {
        setIsSubmitting(false);
        setStatusMessage(`Error: ${err.message}`);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'sans-serif', color: '#64748b' }}>
        <p>Loading profile details...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#1e293b' }}>
          Makazi
        </div>
        <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#64748b' }}>
          <span style={{ cursor: 'pointer' }}>Discover</span>
          <span style={{ cursor: 'pointer' }}>Map</span>
          <span style={{ cursor: 'pointer' }}>Favorites</span>
          <span style={{ cursor: 'pointer' }}>Messages</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={formData.profileImage}
            alt="Profile Avatar"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <button style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Find a Home
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a' }}>
          Edit Profile
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0' }}>
          Update your personal details and housing preferences to get better matches.
        </p>

        {/* Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Navigation Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: activeTab === 'personal' ? '#2b3674' : 'transparent',
                color: activeTab === 'personal' ? '#ffffff' : '#64748b'
              }}
            >
              👤 Personal Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('housing')}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: activeTab === 'housing' ? '#2b3674' : 'transparent',
                color: activeTab === 'housing' ? '#ffffff' : '#64748b'
              }}
            >
              🏢 Housing Preferences
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('account')}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: activeTab === 'account' ? '#2b3674' : 'transparent',
                color: activeTab === 'account' ? '#ffffff' : '#64748b'
              }}
            >
              ⚙️ Account Settings
            </button>
          </aside>

          {/* Form Content Card */}
          <section style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '32px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 24px 0',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              👤 Personal Information
            </h2>

            {/* Profile Picture Upload Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <img
                src={formData.profileImage}
                alt="Avatar"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <label style={{
                  backgroundColor: '#cbd5e1',
                  color: '#334155',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}>
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>
                  JPG, GIF or PNG. Max size of 8MB.
                </div>
              </div>
            </div>

            {/* Main Form Fields */}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  University/College
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="Strathmore University">Strathmore University</option>
                  <option value="University of Nairobi">University of Nairobi</option>
                  <option value="Kenyatta University">Kenyatta University</option>
                  <option value="JKUAT">JKUAT</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Year of study
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Student Number
                </label>
                <input
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                  Expected Graduation Date
                </label>
                <input
                  type="text"
                  name="expectedGraduation"
                  value={formData.expectedGraduation}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Action Area */}
              <div style={{ gridColumn: 'span 2', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#2b3674',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                {statusMessage && (
                  <span style={{ fontSize: '14px', color: statusMessage.startsWith('Error') ? '#ef4444' : '#10b981' }}>
                    {statusMessage}
                  </span>
                )}
              </div>
            </form>
          </section>

        </div>
      </main>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#f8fafc',
  fontSize: '14px',
  color: '#1e293b',
  outline: 'none',
  boxSizing: 'border-box'
};

export default StudentEditProfile;