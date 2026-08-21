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
      `admin-sidebar-link flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-all duration-200 ${
      isActive
        ? 'bg-purple-700 text-purple-100'
        : 'text-black hover:bg-purple-400 hover:text-white'
    }`;

    return (
        <>
        <div className="admin-sidebar absolute h-screen w-45 bg-surface-container-low p-2 text-on-surface">
          <h1 className="flex items-center justify-center p-2 font-extrabold text-primary"><span className="m-1 inline-block"><Home/></span>Saka Keja</h1>
            <div className="flex items-center justify-between p-2 mb-7 mt-7 gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-center font-bold text-white">JD</div>
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
                className={linkClass}              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
            </div>
            <div className="absolute bottom-4 rounded bg-primary p-2 text-white transition-colors hover:bg-primary-container">
                + List New Property
            </div>
        </div>
        </>
    )
}