import Navbar from "../../components/Navbar/Navbar"
import WhySakaKeja from "../../components/WhySakaKeja";

export default function Home() {
  return (
    <>
      {/* Main navigation for the student home page */}
      <Navbar showSearch={false} />
      <WhySakaKeja />
    </>
  );
}