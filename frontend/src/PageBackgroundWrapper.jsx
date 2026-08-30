import { useLocation } from 'react-router-dom';

// Define explicit background and text color classes for every page route in your project
const routeBackgrounds = {
  '/': 'bg-slate-950 text-white',                 // Auth / Login page
  '/home': 'bg-stone-50 text-slate-900',          // Home page
  '/about': 'bg-white text-slate-900',            // About page
  '/admin-dash': 'bg-zinc-900 text-zinc-100',     // Admin Dashboard
  '/search': 'bg-sky-50 text-slate-900',          // Search Results
  '/apartment-details': 'bg-slate-100 text-slate-900', // Apartment Details
  '/compare': 'bg-indigo-50 text-slate-900',      // Compare Page
  '/savedproperties': 'bg-amber-50 text-slate-900', // Saved Properties
  '/my-properties': 'bg-teal-50 text-slate-900',   // My Properties
  '/student-profile': 'bg-emerald-50 text-slate-900', // Student Profile
  '/owner-profile': 'bg-purple-50 text-slate-900',   // Owner Profile
  '/student/edit-profile': 'bg-blue-50 text-slate-900', // Edit Student Profile
  '/manager/edit-profile': 'bg-zinc-800 text-zinc-100' // Manager Edit Profile
};

export function PageBackgroundWrapper({ children }) {
  const location = useLocation();
  
  // Match exact route, or fall back to a default style if a dynamic route (like /available-units/:id) matches a pattern
  let currentBg = routeBackgrounds[location.pathname];

  if (!currentBg) {
    if (location.pathname.startsWith('/available-units/')) {
      currentBg = 'bg-orange-50 text-slate-900'; // Unique background for unit listings
    } else if (location.pathname.startsWith('/edit-property/')) {
      currentBg = 'bg-rose-50 text-slate-900';   // Unique background for property editing
    } else {
      currentBg = 'bg-white text-slate-900';     // Global default fallback
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentBg}`}>
      {children}
    </div>
  );
}