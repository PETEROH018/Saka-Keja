import {
  LayoutDashboard,
  Heart,
  Building2,
  UserRound,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/student-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Favorites",
    path: "/saved-properties",
    icon: Heart,
  },
  {
    label: "View Units",
    path: "/available-units",
    icon: Building2,
  },
  {
    label: "Profile",
    path: "/student-profile",
    icon: UserRound,
  },
];

export default function StudentSidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map(({ label, path, icon: Icon }) => (
          <a
            key={label}
            href={`#${path}`}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}