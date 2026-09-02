import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import AdminSideBar from '../AdminSideBar/AdminSideBar';

export default function ManagerProfile() {
  const location = useLocation();
  const [manager, setManager] = useState(location.state?.updatedManager || null);
  const [loading, setLoading] = useState(!location.state?.updatedManager);
  const {user} = useAuth()

  useEffect(() => {
    if (!location.state?.updatedManager) {
      fetch(`http://localhost:5000/managers/${user.id}`)
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
  }, [user.id, location.state]);

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
      <AdminSideBar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full p-8 space-y-8">
          
          {/* Top Profile Header Card with Edit Button */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-slate-200 dark:bg-zinc-200 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-slate-500 text-sm font-medium uppercase">
                  {profile?.full_name ? profile?.full_name.slice(0, 2) : '??'}
                </span>
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

         

        </div>
      </main>
    </div>
  );
}