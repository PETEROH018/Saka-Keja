import './App.css'
import { AuthPage } from './pages/Login/Auth.jsx'
import Home from './pages/Home/Home'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import ApartmentDetails from './pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import AddApartment from './pages/AddApartment/AddApartment'
import MyProperties from './pages/MyProperties/MyProperties.jsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage"
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx"
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx'
import SavedProperties from './pages/SavedProperties/SavedProperties'
import About from "./pages/About/About.jsx"
import EditProperty from './pages/EditProperty/EditProperty.jsx'
import AvailableUnits from './pages/AvailableUnits/AvailableUnits.jsx'
import UnitDetails from './pages/UnitDetails/UnitDetails';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/apartment-details" element={<ApartmentDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/saved-properties" element={<SavedProperties />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/add-apartment' element={<AddApartment />} />
        <Route path="/about" element={<About />} />
        <Route path="/available-units/:id" element={<AvailableUnits />} />
        <Route path="/apartments/:apartmentId/units/:unitId" element={<UnitDetails />} />      </Routes>
    </HashRouter>
  )
}

export default App