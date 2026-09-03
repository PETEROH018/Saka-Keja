import './App.css'
import { AuthPage } from './pages/Login/Auth.jsx'
import Home from './pages/Home/Home'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import ApartmentDetails from './pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import AddApartment from './pages/AddApartment/AddApartment'
import MyProperties from './pages/MyProperties/MyProperties.jsx'
import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
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
import EditUnit from './pages/EditUnit/EditUnit.jsx'  
import StudentDashboard from './pages/StudentDashboard/StudentDashboard'
import UnitListingForm from './pages/UnitListingForm/UnitListingForm.jsx'
import { useAuth } from './context/useAuth.jsx'

const ProtectedRoute = ({ allowedRoles, user }) => {
  // Check if user is logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has the correct role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If logged in and role matches, render the child routes
  return <Outlet />;
};

function App() {
  const { user } = useAuth();
  return (
    <HashRouter>
      
     
      <Routes>
        {/* Pulic routes */}
        <Route path="/" element={<Home />} />
        <Route path="/apartment-details/:id" element={<ApartmentDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/owner/units/add" element={<UnitListingForm/>}/>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/available-units/:id" element={<AvailableUnits />} />
        <Route path="/unit-details/:id" element={<UnitDetails />} /> 

         {/* Owner only routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={['owner']} />}>
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/edit-unit/:id" element={<EditUnit />} />
          <Route path="/manager-profile" element={<ManagerProfile />} />
          <Route path="/ManagerEditProfile" element={<ManagerEditProfile />} />
          <Route path='/add-apartment' element={<AddApartment />} />
        </Route>
        {/* Student Only Routes */}
        <Route element={<ProtectedRoute user={user} allowedRoles={['student']} />}>
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route path="/StudentEditProfile" element={<StudentEditProfile />} />
          <Route path="/student-edit-profile" element={<StudentEditProfile />} />
          <Route path="/edit-profile" element={<StudentEditProfile />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>        

        {/* <Route path="/owner-profile" element={<OwnerProfile />} /> */}
        {/* <Route path="/saved-properties" element={<SavedProperties />} /> */}
        {/* <Route path="/apartments/:apartmentId/units/:unitId" element={<UnitDetails />} /> */}
      </Routes>
    </HashRouter>

  )
}

export default App;