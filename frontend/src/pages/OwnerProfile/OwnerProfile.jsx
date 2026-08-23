import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import Footer from "../../components/Footer/Footer"

function OwnerProfile() {
  return (
    <div>
      <AdminSideBar/>
      <div className="absolute h-full right-0 top-0 bg-red-200 w-[70%]">
        <div className="w-10 rounded-full bg-gray-900">JD</div>
      </div>
      <Footer/>
    </div>
  )
}

export default OwnerProfile
