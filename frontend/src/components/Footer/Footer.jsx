import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
                <div>
                    <h2>Saka Keja</h2>
                    <p>Find your perfect student home.</p>
                </div>

                <nav aria-label="Footer navigation">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/help">Help</NavLink>
                    <NavLink to="/privacy">Privacy</NavLink>
                    <NavLink to="/terms">Terms</NavLink>
                </nav>

                <p>© 2026 Saka Keja. All rights reserved.</p>
            </div>
        </footer>
    )
}