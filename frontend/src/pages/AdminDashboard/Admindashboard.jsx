import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { Building2, Eye, MessageSquare, Heart } from "lucide-react"


export default function AdminDashboard() {
    
    return (
        <>
        <AdminSideBar/>
        <div className="absolute w-[70%] bg-red-200 h-screen right-0 p-2 ">
        <h1 className="font-bold text-3xl ">Dashboard Overview</h1>
        <p className="text-sm text-gray-400">Welcome back. Here's what's happening to your property today.</p>
        <div className="flex justify-between mt-7 flex-wrap gap-2">
            <div className="bg-white p-2 rounded-lg p-4">
                <div className="flex gap-2 mb-4">
                <Building2 className="bg-purple-200 w-7 h-7 rounded text-purple-600 text-center p-1"/>  
                <div className="text-purple-400 bg-purple-200 rounded-lg text-xs text-center w-fit p-1 h-fit">+1 this week</div> 
                </div>   
                <div className="flex gap-3">
                <span className="font-bold text-4xl">4</span> 
                <span className="text-gray-600 text-sm">Active listings</span>
                </div>       
                
            </div>
            <div className="bg-white p-2 rounded-lg p-4">
                <div className="flex gap-2 mb-4">
                <Eye className="bg-yellow-200 w-7 h-7 rounded text-center p-1"/>  
                <div className="text-purple-400 bg-purple-200 rounded-lg text-xs text-center w-fit p-1 h-fit">+1 this week</div> 
                </div>    
                <div className="flex gap-1">
                <span className="font-bold text-2xl">1245</span> 
                <span className="text-gray-600 text-sm" >Total views</span>
                </div> 
                
            </div>
            <div>New Inquiries</div>
            <div>favourites</div>
        </div>
        </div>        
        </>
    )
}