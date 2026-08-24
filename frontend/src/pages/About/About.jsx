import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import aboutHero from "../../assets/images/about-hero-image.jpg";
import aboutStory from "../../assets/images/about-story-image.jpg";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Search,
    Users,
    Sparkles,
} from "lucide-react";

function About() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="px-6 py-16 md:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

                        {/* Hero Content */}
                        <div>
                            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                                Empowering Students with Safe, Verified Housing.
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
                                At Saka Keja, we make finding student housing simpler, safer,
                                and more reliable. We connect students with verified homes near
                                campus while giving property owners an easier way to reach the
                                right tenants.
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className="overflow-hidden rounded-xl">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={aboutHero}
                                    alt="Modern student housing available through Saka Keja"
                                    className="h-72 w-full object-cover md:h-80"
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Mission Section */}
                <section className="bg-purple-50 px-6 py-14 md:py-16">
                    <div className="mx-auto max-w-6xl text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Our Mission
                        </h2>

                        <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-gray-600">
                            To make student housing easier to find, safer to choose, and more
                            accessible by connecting students with verified homes and trusted
                            property owners.
                        </p>
                    </div>
                </section>
                {/* Values Section */}
                <section className="bg-purple-50 px-6 pb-16">
                    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">

                        <div className="rounded-xl border border-purple-100 bg-white p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-violet-700">
                                <ShieldCheck size={20} />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Trust & Safety
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                We prioritize verified listings and clearer property information so
                                students can search for housing with greater confidence.
                            </p>
                        </div>

                        <div className="rounded-xl bg-violet-700 p-6 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                                <Search size={20} />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">
                                Modernizing the Search
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-violet-100">
                                We simplify how students discover, compare, and understand housing
                                options through a more convenient digital experience.
                            </p>
                        </div>

                        <div className="rounded-xl border border-purple-100 bg-white p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-violet-700">
                                <Users size={20} />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Community Focused
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Saka Keja is built around the needs of students, campuses,
                                neighbourhoods, and the communities that support them.
                            </p>
                        </div>

                        <div className="rounded-xl border border-purple-100 bg-white p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                                <Sparkles size={20} />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Empowering Owners
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                We help property owners present their homes clearly and connect with
                                students who are actively looking for suitable accommodation.
                            </p>
                        </div>

                    </div>
                </section>


                {/* Why We Started Section */}
                <section className="bg-[#f2edf5] px-6 py-16 md:py-20">
                    <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src={aboutStory}
                                alt="Student searching for housing with Saka Keja"
                                className="h-80 w-full object-cover md:h-[420px]"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Why We Started
                            </h2>

                            <div className="mt-5 space-y-4 text-base leading-7 text-gray-600">
                                <p>
                                    Finding student housing should not mean relying on scattered
                                    listings, unclear information, or endless referrals.
                                </p>

                                <p>
                                    Saka Keja was created to make that process more structured and
                                    trustworthy. We want students to understand their options before
                                    making a decision while giving responsible property owners a clearer
                                    way to reach them.
                                </p>

                                <p>
                                    By bringing housing discovery, property information, and verified
                                    listings into one experience, we are building a more practical way
                                    for students to find a place they can confidently call home.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-white px-6 py-16 md:py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Ready to Get Started?
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600">
                                Whether you're searching for student housing or looking to reach
                                students with your property, Saka Keja makes the process simpler.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Student CTA */}
                            <div className="rounded-2xl bg-violet-700 p-8 text-white md:p-10">
                                <h3 className="text-2xl font-bold">
                                    Looking for your next home?
                                </h3>

                                <p className="mt-3 max-w-md leading-7 text-violet-100">
                                    Explore verified student housing and find an option that works for
                                    you.
                                </p>

                                <Link to="/search" className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50">
                                    Find a Home
                                </Link>
                            </div>

                            {/* Owner CTA */}
                            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8 md:p-10">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Have a property for students?
                                </h3>

                                <p className="mt-3 max-w-md leading-7 text-gray-600">
                                    List your property and connect with students actively searching for
                                    accommodation.
                                </p>

                                <Link to="" className="mt-6 inline-flex rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800">
                                    List a Property
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div >
    );
}

export default About;