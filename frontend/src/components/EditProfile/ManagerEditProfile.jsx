import React, { useState } from 'react';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    bio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Submitted:', formData);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      bio: '',
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm"> Lucy Gitau</p>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                Manager
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <a href="#dashboard" className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Dashboard
            </a>
            <a href="#edit-profile" className="block px-3 py-2 text-sm font-medium text-indigo-900 bg-indigo-50 rounded-lg transition-colors">
              Edit Profile
            </a>
            <a href="#properties" className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Saved Properties
            </a>
            <a href="#settings" className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              Account Settings
            </a>
          </nav>
        </div>

        <button className="w-full py-2 bg-indigo-900 text-white text-sm font-medium rounded-lg hover:bg-indigo-800 transition-colors">
          List New Property
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-sm text-gray-500">Update your personal information and profile picture.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Block */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-gray-700">Phone Number</label>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      Verified
                    </span>
                  </div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +254
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="700000000"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Bio */}
            <section className="bg-white p-6 rounded-xl border border-gray-200 space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Professional Bio</h2>
              <textarea
                name="bio"
                rows="4"
                maxLength={500}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                placeholder="Tell us a bit about yourself..."
              />
              <div className="text-right text-xs text-gray-400">
                {formData.bio.length}/500 characters
              </div>
            </section>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-indigo-900 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

          {/* Right Column: Avatar & Tips */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Profile Avatar"
                  className="w-full h-full rounded-full object-cover border-2 border-indigo-900"
                />
                <button
                  type="button"
                  aria-label="Edit avatar image"
                  className="absolute bottom-0 right-0 p-1.5 bg-indigo-900 text-white rounded-full shadow hover:bg-indigo-800 transition-colors"
                >
                  ✏️
                </button>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-medium mb-2">
                Identity Verified
              </span>
              <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max size.</p>
            </div>

            {/* Pro Tip Banner */}
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
              <p className="text-xs font-semibold text-indigo-900 mb-1">Pro Tip</p>
              <p className="text-xs text-indigo-700">
                A detailed bio and verified contact details help landlords respond up to 2x faster.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
