import './App.css'
import Login from './pages/Login/Auth'
import Home from '../src/pages/Home/Home'
import AdminDashboard from '../src/pages/AdminDashboard/Admindashboard'
import ApartmentDetails from '../src/pages/ApartmentDetails'
import SearchResults from './pages/SearchResults/SearchResults'
import MyProperties from './pages/MyProperties/MyProperties'
import EditProperty from "./pages/EditProperty/EditProperty";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/admin-dash' element={<AdminDashboard />} />
          <Route path='/apartment-details' element={<ApartmentDetails />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App