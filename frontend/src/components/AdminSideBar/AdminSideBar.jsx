import { Home, LayoutDashboard, Building2, PlusCircle, HelpCircle, Mail, User } from "lucide-react"
import { NavLink } from "react-router-dom";


export default function AdminSideBar() {
    const navlinks = [
        {to: "/admin-dash", label: "Dashboard", icon: LayoutDashboard},
        {to: "/my-properties", label: "My Properties", icon: Building2},
        {to: "/add-property", label: "Add Property", icon: PlusCircle},
        {to: "/inquiries", label: "Inquiries", icon: HelpCircle},
        {to: "/messages", label: "Messages", icon: Mail},
        {to: "/admin-profile", label: "Profile", icon: User},
    ]

     const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
      isActive
        ? 'bg-purple-700 text-purple-100'
        : 'text-black hover:bg-purple-400 hover:text-white'
    }`;

    return (
        <>
        <div className="absolute h-screen w-45 bg-gray-200 text-white-100 p-2">
            <h1 className="text-purple-700 p-2 font-extrabold flex justify-center items-center"><span className="inline-block m-1"><Home/></span>Saka Keja</h1>
            <div className="flex items-center justify-between p-2 mb-7 mt-7 gap-3">
                <div className="bg-gray-500 w-9 h-9 rounded-full text-center font-bold">JD</div>
                <div className="flex items-center justify-center">
                <div className="font-bold">Property owner</div>
                {/*if the owner is verified <div>Verified owner</div> */}
                </div>                
            </div>
            <div >
            {navlinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={linkClass}              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
            </div>
            <div className="bg-purple-700 p-2 rounded text-white absolute bottom-4">
                + List New Property
            </div>
        </div>
        </>
    )
}