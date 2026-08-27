import './App.css'
import { AuthPage } from './pages/Login/Auth.jsx'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import AddApartment from './pages/AddApartment/AddApartment'
import MyProperties from './pages/MyProperties/MyProperties.jsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ComparePage from "./pages/Compare/ComparePage";
import StudentProfile from "./components/StudentProfile/StudentProfile.jsx";
import OwnerProfile from './pages/OwnerProfile/OwnerProfile.jsx'
import SavedProperties from './pages/SavedProperties/SavedProperties';
import About from "./pages/About/About.jsx";
import EditProperty from './pages/EditProperty/EditProperty.jsx'
import AvailableUnits from './pages/AvailableUnits/AvailableUnits.jsx'

function App() {
  return (

    <HashRouter>
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
        <Route path="/available-units/:id" element={<AvailableUnits />} />
      </Routes>
    </HashRouter>

  )
}

export default App