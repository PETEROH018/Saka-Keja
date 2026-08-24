import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold">
              Empowering Students with Safe, Verified Housing.
            </h1>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;