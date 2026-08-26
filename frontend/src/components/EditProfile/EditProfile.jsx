import { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "Samuel Kimani",
    companyName: "Kimani Properties Ltd",
    email: "samuel.k@example.com",
    phone: "712 345 678",
    bio: "",
  });

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">Makazi</h1>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden" />
            <div>
              <p className="text-sm font-semibold">Property Manager</p>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Verified Owner</span>
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
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h3>
              </div>
            </div>
            <div className="space-y-6">Sidebar Column</div>
          </div>
        </div>
      </main>
    </div>
  );
}
