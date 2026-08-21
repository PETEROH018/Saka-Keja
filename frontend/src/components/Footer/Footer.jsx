import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-violet-700">
                            Saka Keja
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Find your perfect student home.
                        </p>
                    </div>

                    <nav
                        aria-label="Footer navigation"
                        className="flex flex-wrap gap-6 text-sm font-medium text-gray-600"
                    >
                        <NavLink to="/about" className="transition-colors hover:text-violet-700">
                            About
                        </NavLink>

                        <NavLink to="/help" className="transition-colors hover:text-violet-700">
                            Help
                        </NavLink>

                        <NavLink to="/privacy" className="transition-colors hover:text-violet-700">
                            Privacy
                        </NavLink>

                        <NavLink to="/terms" className="transition-colors hover:text-violet-700">
                            Terms
                        </NavLink>
                    </nav>
                </div>

                <p className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-500">
                    © 2026 Saka Keja. All rights reserved.
                </p>
            </div>
        </footer>
    )
}