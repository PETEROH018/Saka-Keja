import { Mail, Phone } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-violet-50">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <h2 className="text-2xl font-bold text-violet-800">
                            Saka Keja
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
                            Helping students find the perfect home near campus, quickly and safely.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            For Students
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                            <NavLink to="/home" className="hover:text-violet-700">
                                Discover
                            </NavLink>

                            <NavLink to="/search" className="hover:text-violet-700">
                                Search
                            </NavLink>

                            <span>Housing Guide</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            For Owners
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                            <span>List a Property</span>
                            <span>Dashboard</span>
                            <span>Owner FAQ</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Company
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                            <NavLink to="/about" className="hover:text-violet-700">
                                About Us
                            </NavLink>

                            <span>Careers</span>

                            <NavLink to="/privacy" className="hover:text-violet-700">
                                Privacy Policy
                            </NavLink>

                            <NavLink to="/terms" className="hover:text-violet-700">
                                Terms
                            </NavLink>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Support
                        </h3>

                        <div className="mt-4 flex flex-col gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <span>hello@sakakeja.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                <span>+254 700 000 000</span>
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700">
                                    f
                                </span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700">
                                    X
                                </span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700">
                                    IG
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-300 pt-6">
                    <p className="text-sm text-gray-600">
                        © 2026 Saka Keja. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}