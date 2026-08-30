import './App.css'
import { AuthPage } from './pages/Login/Auth.jsx'
import Home from './pages/Home/Home'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import ApartmentDetails from './pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import AddApartment from './pages/AddApartment/AddApartment'
import MyProperties from './pages/MyProperties/MyProperties.jsx'
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage"
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx"
import StudentEditProfile from "./components/EditProfile/StudentEditProfile.jsx"
import ManagerEditProfile from "./components/EditProfile/ManagerEditProfile.jsx"
import ManagerProfile from "./components/StudentProfile/ManagerProfile.jsx"
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx'
import SavedProperties from './pages/SavedProperties/SavedProperties'
import About from "./pages/About/About.jsx"
import EditProperty from './pages/EditProperty/EditProperty.jsx'
import AvailableUnits from './pages/AvailableUnits/AvailableUnits.jsx'
import UnitDetails from './pages/UnitDetails/UnitDetails';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard'

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

        {/* Student Profile & Edit Routes */}
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/StudentProfile" element={<StudentProfile />} />
        <Route path="/StudentEditProfile" element={<StudentEditProfile />} />
        <Route path="/student-edit-profile" element={<StudentEditProfile />} />
        <Route path="/edit-profile" element={<StudentEditProfile />} />

        <Route path="/owner-profile" element={<OwnerProfile />} />
        <Route path="/saved-properties" element={<SavedProperties />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Manager Profile & Edit Routes */}
        <Route path="/manager-profile" element={<ManagerProfile />} />
        <Route path="/ManagerProfile" element={<ManagerProfile />} />
        <Route path="/ManagerEditProfile" element={<ManagerEditProfile />} />
        <Route path="/manager-edit-profile" element={<ManagerEditProfile />} />

        <Route path='/add-apartment' element={<AddApartment />} />
        <Route path="/about" element={<About />} />
        <Route path="/available-units/:id" element={<AvailableUnits />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/unit/:id" element={<UnitDetails />} />
      </Routes>
    </HashRouter>

  )
}

export default App;