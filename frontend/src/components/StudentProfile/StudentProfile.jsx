import React from 'react';
import { 
  Search, 
  Pencil, 
  Building2, 
  Mail, 
  Phone, 
  X, 
  Globe 
} from 'lucide-react';

export default function StudentProfile() {
  const profileData = {
    fullName: 'Jane Smith',
    email: 'jane.smith@students.uonbi.ac.ke',
    phone: '+254 712 345 678',
    dateOfBirth: '14th March, 2002',
    university: 'University of Nairobi',
    course: 'BSc. Computer Science',
    yearOfStudy: 'Year 3',
    studentId: 'P15/1234/2021',
    expectedGraduation: 'July 2025'
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8fb] text-[#1e1b4b] font-sans">
      
      {/* TOP NAVBAR */}
      <header className="bg-white border-b border-gray-100 px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-10">
          <span className="text-xl font-bold text-[#4f46e5]">Saka Keja</span>
          <nav className="hidden md:flex space-x-6 text-xs font-medium text-gray-500">
            <a href="#discover" className="hover:text-[#4f46e5] transition">Discover</a>
            <a href="#map" className="hover:text-[#4f46e5] transition">Map</a>
            <a href="#profile" className="text-[#4f46e5] font-semibold border-b-2 border-[#4f46e5] pb-4 -mb-4">Profile</a>
            <a href="#messages" className="hover:text-[#4f46e5] transition">Messages</a>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1.5 bg-[#f3f4f6] text-xs rounded-full focus:outline-none focus:ring-1 focus:ring-[#4f46e5] w-40 md:w-56 text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="bg-[#5b52f6] hover:bg-[#4f46e5] text-white text-xs px-4 py-1.5 rounded-lg font-medium transition shadow-sm">
            Find a Home
          </button>
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
            alt="Profile Avatar" 
            className="w-7 h-7 rounded-full object-cover border border-gray-200"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl w-full mx-auto px-6 pt-10 pb-16 flex-grow">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">Student Profile</h1>
            <p className="text-gray-400 text-xs mt-1">Manage your personal information and university details.</p>
          </div>
          <button className="flex items-center space-x-1.5 text-[11px] border border-gray-200 bg-white rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition shadow-2xs font-medium">
            <Pencil className="w-3 h-3 text-gray-500" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PERSONAL INFORMATION CARD */}
          <div className="bg-white rounded-xl p-6 border border-gray-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-[#0f172a] pb-4 mb-5 border-b border-gray-100">
              Personal Information
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Full Name</p>
                <p className="font-medium text-gray-800">{profileData.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Email Address</p>
                <p className="font-medium text-gray-800">{profileData.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Phone Number</p>
                <p className="font-medium text-gray-800">{profileData.phone}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Date of Birth</p>
                <p className="font-medium text-gray-800">{profileData.dateOfBirth}</p>
              </div>
            </div>
          </div>

          {/* ACADEMIC INFORMATION CARD */}
          <div className="bg-white rounded-xl p-6 border border-gray-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-[#0f172a] pb-4 mb-5 border-b border-gray-100">
              Academic Information
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">University/Institution</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                    <Building2 className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-semibold text-gray-800">{profileData.university}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Course of Study</p>
                <p className="font-medium text-gray-800">{profileData.course}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Year of Study</p>
                <p className="font-medium text-gray-800">{profileData.yearOfStudy}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Student ID Number</p>
                <p className="font-medium text-gray-800">{profileData.studentId}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Expected Graduation</p>
                <p className="font-medium text-gray-800">{profileData.expectedGraduation}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#f2eff8]/60 border-t border-gray-200/50 text-[11px] text-gray-500 pt-10 pb-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <span className="text-[#4f46e5] font-bold text-base block mb-2">Saka Keja</span>
            <p className="text-gray-400 leading-normal text-[11px]">
              Helping students find the perfect home near campus, quickly and safely.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 text-xs">For Students</h3>
            <ul className="space-y-1.5 text-gray-500">
              <li><a href="#discover" className="hover:text-gray-800 transition">Discover</a></li>
              <li><a href="#search" className="hover:text-gray-800 transition">Search</a></li>
              <li><a href="#map" className="hover:text-gray-800 transition">Map</a></li>
              <li><a href="#guide" className="hover:text-gray-800 transition">Housing Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 text-xs">For Owners</h3>
            <ul className="space-y-1.5 text-gray-500">
              <li><a href="#list" className="hover:text-gray-800 transition">List a Property</a></li>
              <li><a href="#dashboard" className="hover:text-gray-800 transition">Dashboard</a></li>
              <li><a href="#faq" className="hover:text-gray-800 transition">Owner FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 text-xs">Company</h3>
            <ul className="space-y-1.5 text-gray-500">
              <li><a href="#about" className="hover:text-gray-800 transition">About Us</a></li>
              <li><a href="#careers" className="hover:text-gray-800 transition">Careers</a></li>
              <li><a href="#privacy" className="hover:text-gray-800 transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-gray-800 transition">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 text-xs">Support</h3>
            <div className="space-y-2 text-gray-500">
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3 h-3 text-gray-400" />
                <span>hello@sakakeja.com</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3 h-3 text-gray-400" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex space-x-2.5 pt-1 text-gray-400">
                <div className="w-4 h-4 rounded-full bg-gray-200/80 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                  <span className="text-[9px] font-bold text-gray-600">i</span>
                </div>
                <X className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600 transition" />
                <Globe className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600 transition" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-8 pt-5 border-t border-gray-200/50 text-[10px] text-gray-400">
          © 2026 Saka Keja Student Housing. All rights reserved.
        </div>
      </footer>
    </div>
  );
}