import Navbar from "../../components/Navbar/Navbar"
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer"
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid"
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

export default function Home() {
  const [endpoint, setEndpoint] = useState("http://localhost:3000/featured");
  // After search, the endpoint will be changed triggering another fetch (http://localhost:3000/apartments)
  const { data: units, loading, error } = useFetch(endpoint);
  return (
    <>
      {/* Main navigation for the student home page */}
      <Navbar showSearch={false} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
      <UnitsGrid units={units} loading={loading} error={error}/>
      <WhySakaKeja />
      </main>
      <Footer />
    </>
  );
}

