import Navbar from "../../components/Navbar/Navbar"
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer"
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid"
import useFetch from "../../hooks/useFetch";
import Filter from "../../components/FilterComponent/Filter";
import { useState } from "react";

export default function Home() {
  const [endpoint, setEndpoint] = useState("http://localhost:3000/featured");
  const [activeFilters, setActiveFilters] = useState(null);
  const { data: units, loading, error } = useFetch(endpoint);

  function onFilter(filterData) {
    setActiveFilters(filterData);
    setEndpoint("http://localhost:3000/apartments");
  }

  function onSearch() {
    setActiveFilters(null);
    setEndpoint("http://localhost:3000/apartments");
  }

  // Filter logic is complex because of limitations of filtering using the mock json data, the logic below should be simplified after implementing our Flask backend

  const filteredUnits = activeFilters
    ? units.filter((unit) => {
      const locationMatches = activeFilters.location
        ? unit.location?.toLowerCase().includes(activeFilters.location.trim().toLowerCase())
        : true;
      const rent = unit["monthly-expense-breakdown"]?.rent;
      const rentMatches = activeFilters.price
        ? Number(rent) <= Number(activeFilters.price)
        : true;
      const bedroomsMatches = activeFilters.bedrooms
        ? activeFilters.bedrooms === "bedsitter"
          ? unit.property_type?.toLowerCase() === "bedsitter"
          : activeFilters.bedrooms === "3+"
            ? Number(unit.bedrooms) >= 3
            : Number(unit.bedrooms) === Number(activeFilters.bedrooms)
        : true;

      return locationMatches && rentMatches && bedroomsMatches;
    })
    : units;

  return (
    <>
      {/* Main navigation for the student home page */}
      <Navbar showSearch={false} />
      <Filter onSearch={onSearch} onFilter={onFilter} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
        <UnitsGrid units={filteredUnits} loading={loading} error={error} />
        <WhySakaKeja />
      </main>
      <Footer />
    </>
  );
}

