import { Home, LayoutDashboard, Building2, PlusCircle, HelpCircle, Mail, User, ShieldCheck } from "lucide-react"
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
        ? 'bg-primary text-white shadow-sm'
        : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary'
    }`;

    return (
      
        <aside className="w-64 md:w-72 shrink-0 min-h-screen border-r border-outline-variant/60 bg-surface-container-low p-5 text-on-surface flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-2 py-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <Home className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-primary">Saka Keja</span>
            </div>

            {/* Profile Card */}
            <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-white p-3 shadow-2xs mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-xs">
                JD
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-on-surface">John Doe</div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Landlord</span>
                </div>
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
      </aside>
    )
}