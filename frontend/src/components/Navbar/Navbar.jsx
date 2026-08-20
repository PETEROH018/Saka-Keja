// Reusable navigation bar 
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu } from "lucide-react"

export default function Navbar({ showSearch = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-violet-800">
            Saka Keja
          </span>

          {showSearch && (
            <div className="relative hidden md:block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search location..."
                aria-label="Search location"
                className="h-10 w-72 rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-violet-600"
              />
            </div>
          )}
        </div>

        <div className="hidden h-full items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-800"
          >
            Find a Home
          </button>

          {/* Temporary placeholder until profile data is connected */}
          <div
            aria-label="User profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
          >
            U
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="text-2xl text-gray-700 md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      {showSearch && (
        <div className="px-4 pb-3 md:hidden">
          <input
            type="search"
            placeholder="Search location..."
            aria-label="Search location"
            className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-violet-600"
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to="/home">Discover</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/messages">Messages</NavLink>

            <button
              type="button"
              className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white"
            >
              Find a Home
            </button>

            <div className="flex items-center gap-3">
              <div
                aria-label="User profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
              >
                U
              </div>
              <span className="text-sm text-gray-700">Profile</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}