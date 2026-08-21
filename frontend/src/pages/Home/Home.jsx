import Navbar from "../../components/Navbar/Navbar"
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer"

export default function Home() {
  return (
    <>
      {/* Main navigation for the student home page */}
      <Navbar showSearch={false} />
      <WhySakaKeja />
      <Footer />
    </>
  );
}