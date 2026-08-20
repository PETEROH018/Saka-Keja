// Reusable navigation bar 
import { NavLink } from "react-router-dom"

export default function Navbar({ showSearch = false }) {
  return (
    <nav>
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

      <div>
        <NavLink to="/home">Discover</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/messages">Messages</NavLink>
      </div>

      <div>
        <button type="button">Find a Home</button>

        {/* Temporary profile placeholder until user data is connected */}
        <div aria-label="User profile">
          <span>U</span>
        </div>
      </div>
    </nav>
  )
}