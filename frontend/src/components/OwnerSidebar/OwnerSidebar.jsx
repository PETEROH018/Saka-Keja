import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  CirclePlus,
  MessageSquareText,
  MessagesSquare,
  UserRound,
  CircleCheck,
  Plus,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/owner-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    path: "/my-properties",
    icon: Building2,
  },
  {
    label: "Add Property",
    path: "/add-property",
    icon: CirclePlus,
  },
  {
    label: "Inquiries",
    path: "/inquiries",
    icon: MessageSquareText,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: MessagesSquare,
  },
  {
    label: "Profile",
    path: "/owner-profile",
    icon: UserRound,
  },
];

export default function OwnerSidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white px-4 py-6">
      <div>
        <h2 className="text-2xl font-bold text-violet-700">
          Saka Keja
        </h2>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
            <UserRound size={18} className="text-violet-700" />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Property Manager
            </p>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <CircleCheck size={13} />
              <span>Verified Owner</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-violet-700 font-medium text-white"
                  : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <NavLink
          to="/add-property"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-800"
        >
          <Plus size={17} />
          List New Property
        </NavLink>
      </div>
    </aside>
  );
}