import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import aboutHero from "../../assets/images/about-hero-image.jpg";

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
            </main>

            <Footer />
        </div>
    );
}

export default About;