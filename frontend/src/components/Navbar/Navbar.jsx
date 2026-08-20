// Reusable navigation bar 
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
      <div>
        <span>Saka Keja</span>
      </div>

      <div>
        <NavLink to="/home">Discover</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/messages">Messages</NavLink>
      </div>
    </nav>
  )
}