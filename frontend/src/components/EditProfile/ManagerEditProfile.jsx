import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function ManagerEditProfile({ managerId = 1 }) {
  const {user} = useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    phone_number: '',
    location: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/managers/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const ownerData = data.owner || data;
        setFormData({
          full_name: ownerData.full_name || '',
          username: ownerData.username || '',
          email: ownerData.email || '',
          phone_number: ownerData.phone_number || '',
          location: ownerData.location || ''
        });
      })
      .catch((err) => console.error("Error fetching manager profile:", err));
  }, [user.id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage('');

    try {
      const response = await fetch(`http://localhost:5000/managers/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatusMessage('Profile updated successfully!');
        const updatedManagerData = resData.owner || resData.manager || formData;

        // Redirect back to profile page after 1 second, passing the updated data via state
        setTimeout(() => {
          navigate('/ManagerProfile', { state: { updatedManager: updatedManagerData } });
        }, 1000);
      } else {
        setStatusMessage('Failed to update profile: ' + (resData.error || 'Check fields'));
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-xl font-bold text-indigo-900 mb-8">Makazi</h1>
          
          <div className="flex items-center space-x-3 mb-8 p-2 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://via.placeholder.com/150" alt="Manager" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Property Manager</p>
              <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">Verified Owner</span>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium text-gray-600">
            <Link to="/admin-dash" className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-indigo-900">Dashboard</Link>
            <Link to="/my-properties" className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-indigo-900">My Properties</Link>
            <Link to="/add-apartment" className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-indigo-900">Add Property</Link>
            <a href="#" className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-indigo-900">Inquiries</a>
            <a href="#" className="flex items-center px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-indigo-900">Messages</a>
            <Link to="/ManagerEditProfile" className="flex items-center px-3 py-2.5 rounded-md bg-indigo-900 text-white shadow-sm">Profile</Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <Link to="/add-apartment" className="block text-center w-full bg-indigo-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-indigo-800 transition shadow-sm">
            List New Property
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Profile</h2>
            <p className="text-sm text-gray-500 mt-1">Update your professional details to build trust with potential tenants.</p>
          </header>

          {statusMessage && (
            <p className={`mb-6 text-sm font-medium p-3 rounded-md border ${
              statusMessage.includes('successfully') 
                ? 'text-emerald-600 bg-emerald-50 border-emerald-200' 
                : 'text-rose-600 bg-rose-50 border-rose-200'
            }`}>
              {statusMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
            {/* Left Column: Form Fields */}
            <div className="col-span-2 space-y-6">
              {/* Personal Information Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Contact Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    />
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">Location</h3>
                
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Office / Base Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                    placeholder="e.g. Nairobi, Kenya"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-2">
                <Link
                  to="/ManagerProfile"
                  className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-indigo-900 text-white rounded-md text-sm font-medium hover:bg-indigo-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Right Column: Profile Picture & Tips */}
            <div className="space-y-6">
              {/* Profile Picture Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center space-y-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mx-auto shadow-inner">
                  <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Profile Picture</h4>
                  <p className="text-xs text-gray-500 mt-1">A clear, professional photo helps build trust with students looking for housing.</p>
                </div>
                <button
                  type="button"
                  className="w-full border border-gray-300 py-2 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
                >
                  Change Picture
                </button>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-center space-x-1.5 text-xs text-emerald-600 font-medium">
                  <span>Identity Verified</span>
                </div>
              </div>

              {/* Pro Tip Card */}
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-amber-800 font-semibold text-xs uppercase tracking-wider">
                  <span>Pro Tip</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Profiles with a complete profile and verified phone number receive 40% more inquiries from students.
                </p>
              </div>
            </div>
          </form>

          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
            <p>© 2026 Makazi Student Housing. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-600">About Us</a>
              <a href="#" className="hover:text-gray-600">Help Center</a>
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
              <a href="#" className="hover:text-gray-600">Contact Support</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}