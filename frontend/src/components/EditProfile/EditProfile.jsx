import { useState } from "react";

export default function EditProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Samuel Kimani",
    companyName: "Kimani Properties Ltd",
    email: "samuel.k@example.com",
    phone: "712 345 678",
    bio: "Experienced property manager dedicated to providing safe and comfortable student housing around major universities in Nairobi. We prioritize maintenance and tenant satisfaction.",
  });

  const handleCancel = () => {
    console.log("Canceling edit operations");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving profile data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">Makazi</h1>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">Property Manager</p>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                Verified Owner
              </span>
            </div>
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">Dashboard</a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">My Properties</a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">Add Property</a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">Inquiries</a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">Messages</a>
            <a href="#" className="flex items-center space-x-3 bg-indigo-900 text-white px-3 py-2 rounded-lg text-sm font-medium">Profile</a>
          </nav>
        </div>
        <button className="w-full bg-indigo-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition">List New Property</button>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-sm text-gray-500 mb-6">Update your professional details to build trust with potential tenants.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Company Name (Optional)</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-gray-600">Phone Number</label>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">✓ Verified</span>
                    </div>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">+254</span>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Professional Bio</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <textarea
                    name="bio"
                    rows={4}
                    maxLength={500}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-right text-xs text-gray-400 mt-1">{formData.bio.length}/500 characters</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={handleCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="button" className="px-5 py-2 bg-indigo-900 text-white rounded-lg text-sm font-medium hover:bg-indigo-800">Save Changes</button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-900 text-white p-1.5 rounded-full border-2 border-white text-xs">✏️</button>
                </div>
                <h4 className="font-semibold text-gray-900">Profile Picture</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">A clear, professional photo helps build trust with students looking for housing.</p>
                <div className="inline-flex items-center space-x-1 border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
                  <span>🛡️</span>
                  <span>Identity Verified</span>
                </div>
              </div>
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 flex items-start space-x-3">
                <span className="text-indigo-600 text-lg">💡</span>
                <div>
                  <h4 className="font-semibold text-indigo-950 text-xs">Pro Tip</h4>
                  <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                    Profiles with a complete bio and verified phone number receive <strong>40% more inquiries</strong> from students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
