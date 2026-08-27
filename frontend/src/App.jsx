<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home.jsx';
import AdminDashboard from './pages/AdminDashboard/Admindashboard.jsx';
import ApartmentDetails from './pages/ApartmentDetails.jsx';
import SearchResults from './pages/SearchResults/SearchResults.jsx';
import Auth from './pages/Login/Auth.jsx';
import ComparePage from './pages/Compare/ComparePage.jsx';

// Components used as routes
import StudentProfile from './components/StudentProfile/StudentProfile.jsx';
import StudentEditProfile from './components/EditProfile/StudentEditProfile.jsx';
import ManagerEditProfile from './components/EditProfile/ManagerEditProfile.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/home' element={<Home />} />
      <Route path='/admin-dash' element={<AdminDashboard />} />
      <Route path='/apartment-details' element={<ApartmentDetails />} />
      <Route path='/search' element={<SearchResults />} />
      <Route path='/compare' element={<ComparePage />} />
      <Route path='/StudentProfile' element={<StudentProfile />} />

      {/* Role-Specific Profile Editing Routes */}
      <Route path='/student/edit-profile' element={<StudentEditProfile />} />
      <Route path='/manager/edit-profile' element={<ManagerEditProfile />} />

      {/* Matches URL paths from your navigation links */}
      <Route path='/StudentEditProfile' element={<StudentEditProfile />} />
      <Route path='/ManagerEditProfile' element={<ManagerEditProfile />} />

      {/* Default/Legacy Fallback Route */}
      <Route path='/EditProfile' element={<StudentEditProfile />} />
    </Routes>
  );
=======
import './App.css'
import {AuthPage} from './pages/Login/Auth.jsx'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import AddApartment from './pages/AddApartment/AddApartment'
import MyProperties from './pages/MyProperties/MyProperties.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage";
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx";
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx'
import SavedProperties from './pages/SavedProperties/SavedProperties';
import About from "./pages/About/About.jsx";
import EditProperty from './pages/EditProperty/EditProperty.jsx'
import AvailableUnits from './pages/AvailableUnits/AvailableUnits.jsx'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/apartment-details" element={<ApartmentDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/savedproperties" element={<SavedProperties />} />
        <Route path="/" element={<AuthPage />} />
        <Route path='/add-apartment' element={<AddApartment />} />
        <Route path="/about" element={<About />} />
        <Route path="/available-units/:id" element={<AvailableUnits/>} />
    </Routes>
    </BrowserRouter>

  )
>>>>>>> 369c91380cd19b6e6f86bf6512ee5af142e68080
}

export default App;