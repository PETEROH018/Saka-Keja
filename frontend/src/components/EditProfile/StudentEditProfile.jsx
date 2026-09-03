import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { User, Home, Settings, Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { API_BASE_URL } from '../../config/api';

export default function StudentEditProfile() {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('personal');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const {user} = useAuth()

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    institution: '',
    year_of_study: '',
    email: '',
    student_number: '',
    graduation_year: ''
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/students/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const studentData = data.student || data;
        setFormData({
          full_name: studentData.full_name || '',
          phone_number: studentData.phone_number || '',
          institution: studentData.institution || '',
          year_of_study: studentData.year_of_study !== null && studentData.year_of_study !== undefined ? String(studentData.year_of_study) : '',
          email: studentData.email || '',
          student_number: studentData.student_number || '',
          graduation_year: studentData.graduation_year !== null && studentData.graduation_year !== undefined ? String(studentData.graduation_year) : ''
        });
      })
      .catch((err) => console.error("Error fetching student profile:", err));
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage('');

    // Prepare payload by mapping select choices to what the backend expects
    const payload = {
      ...formData,
      year_of_study: formData.year_of_study ? parseInt(formData.year_of_study, 10) : null,
      graduation_year: formData.graduation_year ? parseInt(formData.graduation_year, 10) : null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/students/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        setStatusMessage('Profile updated successfully!');
        
        // Pass the updated student payload through location state to StudentProfile
        const updatedStudentData = resData.student || payload;

        setTimeout(() => {
          navigate('/StudentProfile', { state: { updatedStudent: updatedStudentData } });
        }, 1000);
      } else {
        const errorMsg = resData.validation_errors 
          ? Object.entries(resData.validation_errors).map(([k, v]) => `${k}: ${v}`).join(', ')
          : (resData.error || resData.details || 'Check fields');
        setStatusMessage('Failed to update profile: ' + errorMsg);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
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

        {statusMessage && (
          <div className={`mb-6 text-xs font-medium p-3 rounded-md border ${
            statusMessage.includes('successfully') 
              ? 'text-emerald-600 bg-emerald-50 border-emerald-200' 
              : 'text-rose-600 bg-rose-50 border-rose-200'
          }`}>
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SIDEBAR TABS */}
          {/* <div className="space-y-1 md:col-span-1">
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
          </div> */}

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
                  {formData.full_name ? formData.full_name.substring(0, 2).toUpperCase() : 'ST'}
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
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">University/College</label>
                  <select
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  >
                    <option value="">Select Institution</option>
                    <option value="Strathmore University">Strathmore University</option>
                    <option value="University of Nairobi">University of Nairobi</option>
                    <option value="Kenyatta University">Kenyatta University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Year of Study</label>
                  <select
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
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
                    name="student_number"
                    value={formData.student_number}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] text-gray-400 font-medium mb-1">Graduation Year</label>
                  <input
                    type="number"
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-indigo-900 text-white px-5 py-2.5 rounded-lg text-xs font-medium hover:bg-indigo-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
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