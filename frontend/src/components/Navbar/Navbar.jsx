// Reusable navigation bar 
import { NavLink } from "react-router-dom"

export default function Navbar({ showSearch = false }) {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-6">
        <div>
          <span className="text-xl font-bold text-violet-800">
            Saka Keja
          </span>
        </div>

        {showSearch && (
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ⌕
            </span>

            <input
              type="search"
              placeholder="Search location..."
              aria-label="Search location"
              className="h-10 w-64 rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-violet-600"
            />
          </div>
        )}
      </div>

      <div className="flex h-full items-center gap-8">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-700 hover:text-violet-700"
            }`
          }
        >
          Discover
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-700 hover:text-violet-700"
            }`
          }
        >
          Favorites
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
              ? "border-violet-700 text-violet-700"
              : "border-transparent text-gray-700 hover:text-violet-700"
            }`
          }
        >
          Messages
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <button type="button">Find a Home</button>

        {/* Temporary profile placeholder until user data is connected */}
        <div aria-label="User profile">
          <span>U</span>
        </div>
      </div>
    </nav>
  )
}