import './App.css';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';

// Pages
import { AuthPage } from './pages/Login/Auth.jsx';
import Home from './pages/Home/Home.jsx';
import AdminDashboard from './pages/AdminDashboard/Admindashboard.jsx';
import ApartmentDetails from './pages/ApartmentDetails.jsx';
import SearchResults from './pages/SearchResults/SearchResults.jsx';
import AddApartment from './pages/AddApartment/AddApartment.jsx';
import MyProperties from './pages/MyProperties/MyProperties.jsx';
import ComparePage from './pages/Compare/ComparePage.jsx';
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx';
import SavedProperties from './pages/SavedProperties/SavedProperties.jsx';
import About from './pages/About/About.jsx';
import EditProperty from './pages/EditProperty/EditProperty.jsx';
import AvailableUnits from './pages/AvailableUnits/AvailableUnits.jsx';
import UnitDetails from './pages/UnitDetails/UnitDetails.jsx';

// Components & Profiles
import StudentProfile from './components/StudentProfile/StudentProfile.jsx';
import StudentEditProfile from './components/EditProfile/StudentEditProfile.jsx';
import ManagerEditProfile from './components/EditProfile/ManagerEditProfile.jsx';

// Route-specific background mapping
const routeBackgrounds = {
  '/': 'bg-stone-50 text-slate-900',          // Home (dev branch default)
  '/auth': 'bg-slate-950 text-white',           // Auth / Login
  '/about': 'bg-white text-slate-900',          // About
  '/admin-dash': 'bg-zinc-900 text-zinc-100',     // Admin Dashboard
  '/search': 'bg-sky-50 text-slate-900',          // Search Results
  '/apartment-details': 'bg-slate-100 text-slate-900', // Apartment Details
  '/compare': 'bg-indigo-50 text-slate-900',      // Compare Page
  '/saved-properties': 'bg-amber-50 text-slate-900', // Saved Properties
  '/my-properties': 'bg-teal-50 text-slate-900',   // My Properties
  '/student-profile': 'bg-emerald-50 text-slate-900', // Student Profile
  '/owner-profile': 'bg-purple-50 text-slate-900',   // Owner Profile
  '/student/edit-profile': 'bg-blue-50 text-slate-900', // Student Edit Profile
  '/manager/edit-profile': 'bg-zinc-800 text-zinc-100', // Manager Edit Profile
  '/StudentEditProfile': 'bg-blue-50 text-slate-900',
  '/ManagerEditProfile': 'bg-zinc-800 text-zinc-100',
  '/EditProfile': 'bg-blue-50 text-slate-900'
};

function PageBackgroundWrapper({ children }) {
  const location = useLocation();
  
  let currentBg = routeBackgrounds[location.pathname];

  if (!currentBg) {
    if (location.pathname.startsWith('/available-units/')) {
      currentBg = 'bg-orange-50 text-slate-900';
    } else if (location.pathname.startsWith('/edit-property/')) {
      currentBg = 'bg-rose-50 text-slate-900';
    } else if (location.pathname.startsWith('/unit/')) {
      currentBg = 'bg-slate-100 text-slate-900';
    } else {
      currentBg = 'bg-white text-slate-900';
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentBg}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <PageBackgroundWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/apartment-details" element={<ApartmentDetails />} />
          <Route path="/available-units/:id" element={<AvailableUnits />} />
          <Route path="/unit/:id" element={<UnitDetails />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/saved-properties" element={<SavedProperties />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/add-apartment" element={<AddApartment />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/owner-profile" element={<OwnerProfile />} />
          <Route path="/student/edit-profile" element={<StudentEditProfile />} />
          <Route path="/manager/edit-profile" element={<ManagerEditProfile />} />
          <Route path="/StudentEditProfile" element={<StudentEditProfile />} />
          <Route path="/ManagerEditProfile" element={<ManagerEditProfile />} />
          <Route path="/EditProfile" element={<StudentEditProfile />} />
        </Routes>
      </PageBackgroundWrapper>
    </HashRouter>
  );
}

export default App;