import { Mail, Phone } from "lucide-react"
import { NavLink } from "react-router-dom"

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.73-1.7H17V2.43A23.9 23.9 0 0 0 14.39 2C11.8 2 10 3.58 10 6.49V9.5H7V13h3v9h3.5Z" />
        </svg>
    )
}

function XIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.27-8.31L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.46 4.05H6.62L17.8 19.84Z" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}
export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-[#f5f1f8]">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
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
                            <div className="mt-5 flex flex-col gap-4 text-sm text-gray-600">
                                <a
                                    href="mailto:hello@sakakeja.com"
                                    className="flex items-center gap-3 transition-colors hover:text-violet-700"
                                >
                                    <Mail size={18} />
                                    <span>hello@sakakeja.com</span>
                                </a>

                                <a
                                    href="tel:+254700000000"
                                    className="flex items-center gap-3 transition-colors hover:text-violet-700"
                                >
                                    <Phone size={18} />
                                    <span>+254 700 000 000</span>
                                </a>

                                <div className="flex items-center gap-3 pt-2">
                                    <span
                                        aria-label="Facebook"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600"
                                    >
                                        <FacebookIcon />
                                    </span>

                                    <span
                                        aria-label="X"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600"
                                    >
                                        <XIcon />
                                    </span>

                                    <span
                                        aria-label="Instagram"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600"
                                    >
                                        <InstagramIcon />
                                    </span>
                                </div>
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