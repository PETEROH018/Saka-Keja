import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { User, Home, Settings, Camera, Save } from 'lucide-react';

export default function StudentEditProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  const [formData, setFormData] = useState({
    fullName: 'David Ochieng',
    phone: '+254 712 345 678',
    university: 'Strathmore University',
    yearOfStudy: '3rd Year',
    email: 'david.ochieng@example.com',
    studentNumber: '123456',
    expectedGraduation: 'December 2025'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/StudentProfile');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8fb] text-[#1e1b4b] font-sans">
      <Navbar showSearch={true} />

      <main className="max-w-5xl w-full mx-auto px-6 pt-10 pb-16 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">Edit Profile</h1>
            <p className="text-gray-500 text-xs mt-1">Update your personal details and housing preferences to get better matches.</p>
          </div>
          
          <Link
            to="/StudentProfile"
            className="text-xs text-indigo-900 font-semibold hover:underline"
          >
            View Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SIDEBAR TABS */}
          <div className="space-y-1 md:col-span-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'personal' 
                  ? 'bg-indigo-900 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setActiveTab('housing')}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'housing' 
                  ? 'bg-indigo-900 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Housing Preferences</span>
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'account' 
                  ? 'bg-indigo-900 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </button>
          </div>

          {/* FORM CONTENT */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-100 shadow-xs space-y-6">
              <h2 className="text-sm font-bold text-[#0f172a] pb-4 border-b border-gray-100 flex items-center space-x-2">
                <User className="w-4 h-4 text-indigo-900" />
                <span>Personal Information</span>
              </h2>

              {/* Avatar Upload Section */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 font-bold text-lg">
                  DO
                </div>
                <div>
                  <button
                    type="button"
                    className="flex items-center space-x-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <Camera className="w-3.5 h-3.5 text-gray-500" />
                    <span>Change Picture</span>
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">JPG, GIF or PNG. Max size of 5MB.</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">University/College</label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  >
                    <option value="Strathmore University">Strathmore University</option>
                    <option value="University of Nairobi">University of Nairobi</option>
                    <option value="Kenyatta University">Kenyatta University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Year of Study</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Student Number</label>
                  <input
                    type="text"
                    name="studentNumber"
                    value={formData.studentNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Expected Graduation Date</label>
                  <input
                    type="text"
                    name="expectedGraduation"
                    value={formData.expectedGraduation}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-indigo-900 text-white px-5 py-2.5 rounded-lg text-xs font-medium hover:bg-indigo-800 transition shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}