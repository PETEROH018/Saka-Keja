// Reusable navigation bar 
import { NavLink } from "react-router-dom"

export default function Navbar({ showSearch = false }) {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-6">
        <div>
          <span>Saka Keja</span>
        </div>

        {showSearch && (
          <div>
            <input
              type="search"
              placeholder="Search location..."
              aria-label="Search location"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        <NavLink to="/home">Discover</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/messages">Messages</NavLink>
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