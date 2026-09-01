import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ManagerProfile({ managerId = 1 }) {
  const location = useLocation();
  const [manager, setManager] = useState(location.state?.updatedManager || null);
  const [loading, setLoading] = useState(!location.state?.updatedManager);

  useEffect(() => {
    if (!location.state?.updatedManager) {
      fetch(`http://localhost:5000/managers/${managerId}`)
        .then((res) => res.json())
        .then((data) => {
          const ownerData = data.owner || data;
          setManager(ownerData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching manager profile:", err);
          setLoading(false);
        });
    }
  }, [managerId, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex font-sans items-center justify-center">
        <p className="text-sm text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  const profile = manager || {
    full_name: 'David Kamau',
    username: 'davidkamau',
    email: 'david.kamau@makazi.co.ke',
    phone_number: '+254 712 345 678',
    location: 'Nairobi, Kenya'
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
              <p className="text-xs font-semibold text-gray-800">{profile.full_name || 'Property Manager'}</p>
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
        <div className="max-w-6xl mx-auto w-full p-8 space-y-8">
          
          {/* Top Profile Header Card with Edit Button */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <img src="https://via.placeholder.com/150" alt={profile.full_name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.full_name}</h2>
                </div>
                <p className="text-xs text-emerald-600 font-medium flex items-center space-x-1 mt-0.5">
                  <span>✔ Verified Property Owner</span>
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p><span className="font-semibold text-gray-700">Email:</span> {profile.email || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-700">Phone:</span> {profile.phone_number || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-700">Location:</span> {profile.location || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Fully Functional Edit Profile Route Link */}
            <Link
              to="/ManagerEditProfile"
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm flex items-center space-x-1"
            >
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-indigo-900 text-white p-5 rounded-xl shadow-sm">
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs uppercase tracking-wider text-indigo-200 mt-1">Total Listings</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Active Tenants</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Avg Rating</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Response Rate</p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-6 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
            <p>© 2026 Makazi Student Housing. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-600">About Us</a>
              <a href="#" className="hover:text-gray-600">Help Center</a>
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}