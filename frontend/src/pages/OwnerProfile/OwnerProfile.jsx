import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import Footer from "../../components/Footer/Footer"

function OwnerProfile() {
  return (
    <>
    <AdminSideBar/>
    <div className=" absolute right-2 top-0 bg-red-200 h-full w-[65%] p-2">      
    <div className="bg-red-200 m-4 rounded-lg p-2">
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-xs">JD </div>
        <div>
            <h1>John Doe</h1>
            <p>Verified property owner</p>
            <p>Experienced property manager dedicated to providing safe, comfortable and affordable student housing</p>
            <hr />
            <div className="flex gap-2">
                <a href="#">email</a>
                <p>phone number</p>
                <p>Joined on</p>
            </div>
        </div>
     </div>
     <div className="flex gap-2">
        <div className="p-4 text-white bg-white/20 border border-gray-300 rounded-lg flex flex-col justify-center text-center"><span className="font-bold text-lg">4</span> Listings</div>
         <div className="p-4 text-white bg-white/20 border border-gray-300 rounded-lg flex flex-col justify-center text-center"><span className="font-bold text-lg">12</span>Active Tenants</div>
         <div className="p-4 text-white bg-white/20 border border-gray-300 rounded-lg flex flex-col justify-center text-center"><span className="font-bold text-lg">4.8</span> Average Rating</div>
    </div> 
    <div>Manage Listings</div>    
    </div>
    <Footer/>
    </>
    
  )
}

export default OwnerProfile
