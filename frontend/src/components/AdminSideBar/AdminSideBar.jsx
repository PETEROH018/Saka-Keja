import { useState } from "react";
import { Home, LayoutDashboard, Building2, PlusCircle, User, ShieldCheck, Menu, X, SquareArrowLeft, LogIn } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";


export default function AdminSideBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const closeSidebar = () => setIsOpen(false);

    const navlinks = [
        {to: "/admin-dash", label: "Dashboard", icon: LayoutDashboard},
        {to: "/my-properties", label: "My Properties", icon: Building2},
        {to: "/add-apartment", label: "Add Property", icon: PlusCircle},
        {to: "/manager-profile", label: "Profile", icon: User},
    ]

    const handleAuthAction = () => {
        if (user) {
            logout();
        }
        closeSidebar();
        navigate("/auth");
    };

    const linkClass = ({ isActive }) =>
      `admin-sidebar-link flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-primary text-white shadow-sm'
        : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary'
    }`;

    return (
        <>
          {/* Mobile Top Navigation Header */}
          <div className="flex md:hidden items-center justify-between border-b border-outline-variant/60 bg-surface-container-low px-4 py-3 sticky top-0 z-30 w-full">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-primary">Saka Keja</span>
            </div>
            <button
              onClick={toggleSidebar}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant/60 bg-white text-on-surface shadow-2xs hover:bg-surface-container-low active:scale-95 transition-all cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Backdrop Overlay */}
          {isOpen && (
            <div
              onClick={closeSidebar}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
              aria-hidden="true"
            />
          )}

          {/* Sidebar Drawer */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 shrink-0 min-h-screen border-r border-outline-variant/60 bg-surface-container-low p-5 text-on-surface flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
              isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div>
              {/* Logo & Mobile Close Button */}
              <div className="flex items-center justify-between px-2 py-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                    <Home className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tight text-primary">Saka Keja</span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-outline-variant/20 transition-colors cursor-pointer"
                  aria-label="Close sidebar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Profile Card */}
              <div className="flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-white p-3 shadow-2xs mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-xs">
                  {user?.name?.charAt(0) || "J"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-on-surface">{user?.name || "Manager"}</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Landlord</span>
                  </div>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="space-y-1.5">
                {navlinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={linkClass}
                      onClick={closeSidebar}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

          {/* Bottom Action */}
          <div className="pt-6 space-y-3">
            <button
              type="button"
              onClick={handleAuthAction}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-container active:scale-[0.98]"
            >
              {user ? <SquareArrowLeft className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              <span>{user ? "Logout" : "Login"}</span>
            </button>

            <NavLink 
              to="/add-apartment"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-container active:scale-[0.98]"
            >
              <PlusCircle className="h-4 w-4" />
              <span>List New Property</span>
            </NavLink>
          </div>
        </aside>
        </>
    )
}