import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer";
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid";
import useFetch from "../../hooks/useFetch";
import Filter from "../../components/FilterComponent/Filter";
import { API_BASE_URL } from "../../config/api";

const DISPLAY_LIMIT = 6;

function buildQueryString(filters) {
  if (!filters) return "";
  const params = new URLSearchParams();

  if (typeof filters.shared === "boolean") {
    params.set("shared", String(filters.shared));
  }
  if (filters.price) {
    params.set("max_rent", filters.price);
  }
  if (filters.bedrooms) {
    params.set("bedrooms", filters.bedrooms);
  }
  if (filters.kitchenette) {
    params.set("kitchenette", "true");
  }
  if (filters.wardrobe) {
    params.set("wardrobe", "true");
  }
  if (filters.balcony) {
    params.set("balcony", "true");
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export default function Home() {
  const [activeFilters, setActiveFilters] = useState(null);

  const endpoint = `${API_BASE_URL}/units${buildQueryString(activeFilters)}`;
  const { data, loading, error } = useFetch(endpoint);

  const units = data ?? [];
  const displayedUnits = units.slice(0, DISPLAY_LIMIT);

  function onFilter(filterData) {
    setActiveFilters(filterData);
  }

  function onSearch() {
    setActiveFilters(null);
  }

  return (
    <>
      <Navbar showSearch={false} />
      <Filter onSearch={onSearch} onFilter={onFilter} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
        <UnitsGrid units={displayedUnits} loading={loading} error={error} />
        <WhySakaKeja />
      </main>
      <Footer />
    </>
  );
}
