// Reusable navigation bar 
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import { useAuth } from "../../context/useAuth"

export default function Navbar({ showSearch = false }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    console.log("Search submitted:", searchQuery)
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-violet-800">
            Saka Keja
          </span>

          {showSearch && (
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:block"
            >
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                ⌕
              </span>

              <input
                type="search"
                placeholder="Search location..."
                aria-label="Search location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-72 rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-violet-600"
              />
            </ form>
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
            to="/savedproperties"
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
            to="/compare"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                ? "border-violet-700 text-violet-700"
                : "border-transparent text-gray-700 hover:text-violet-700"
              }`
            }
          >
            Compare Apartments
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                ? "border-violet-700 text-violet-700"
                : "border-transparent text-gray-700 hover:text-violet-700"
              }`
            }
          >
            About Us
          </NavLink>
        </div>

        <div className="hidden items-center gap-4 md:flex">

          {user ? (
            <>
              <button
                type="button"
                className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-800"
                onClick={() => navigate('/search')}
              >
                Find a Home
              </button>

              <NavLink
                to={
                  user.role === "student"
                    ? "/student-profile"
                    : "/owner-profile"
                }
                aria-label="User profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
              >
                {user.name.charAt(0)}
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/auth")}
                className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-800"
              >
                Login/Sign Up
              </button>
            </div>
          )}

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
        <form
          onSubmit={handleSearchSubmit}
          className="px-4 pb-3 md:hidden"
        >
          <input
            type="search"
            placeholder="Search location..."
            aria-label="Search location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-violet-600"
          />
        </form>
      )}

      {isMenuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to="/home" onClick={closeMenu} className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-violet-50 text-violet-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-violet-700"
              }`
            } >Discover</NavLink>
            <NavLink to="/savedproperties" onClick={closeMenu} className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-violet-50 text-violet-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-violet-700"
              }`
            }>Favorites</NavLink>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-violet-50 text-violet-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-violet-700"
              }`
            }>About Us</NavLink>

            {user && (
              <button
                type="button"
                onClick={() => {
                  navigate("/search")
                  closeMenu()
                }}
                className="w-full rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white"
              >
                Find a Home
              </button>
            )}

            {user ? (
              <NavLink
                to={
                  user.role === "student"
                    ? "/student-profile"
                    : "/owner-profile"
                }
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
                >
                  {user.name.charAt(0)}
                </div>

                <span className="text-sm text-gray-700">
                  Profile
                </span>
              </NavLink>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate("/login")
                    closeMenu()
                  }}
                  className="text-left text-sm font-medium text-gray-700"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/signup")
                    closeMenu()
                  }}
                  className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}