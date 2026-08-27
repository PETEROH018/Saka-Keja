import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; // Adjust relative import path as needed
import Footer from '../Footer/Footer'; // Adjust relative import path as needed
=======
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
>>>>>>> 369c91380cd19b6e6f86bf6512ee5af142e68080
import { 
  Pencil, 
  Building2 
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
      
<<<<<<< HEAD
      {/* REUSABLE NAVBAR */}
      <Navbar showSearch={true} />

      {/* MAIN CONTENT AREA */}
=======
      {/* TOP NAVBAR */}
    <Navbar/>

      {/* MAIN CONTENT */}
>>>>>>> 369c91380cd19b6e6f86bf6512ee5af142e68080
      <main className="max-w-5xl w-full mx-auto px-6 pt-10 pb-16 flex-grow">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">Student Profile</h1>
            <p className="text-gray-500 text-xs mt-1">Manage your personal information and university details.</p>
          </div>
          
          {/* UPDATED LINK TO EDIT PROFILE */}
          <Link 
            to="/edit-profile" 
            className="flex items-center space-x-1.5 text-xs border border-gray-200 bg-white rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition shadow-xs font-medium"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
            <span>Edit Profile</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PERSONAL INFORMATION CARD */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-xs">
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
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-xs">
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

<<<<<<< HEAD
      {/* REUSABLE FOOTER */}
      <Footer />

=======
      {/* FOOTER */}
     <Footer/>
>>>>>>> 369c91380cd19b6e6f86bf6512ee5af142e68080
    </div>
  );
}