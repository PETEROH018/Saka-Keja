import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer";
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid";
import useFetch from "../../hooks/useFetch";
import Filter from "../../components/FilterComponent/Filter";

const API_BASE_URL = "http://localhost:5000"; // Flask backend — replace json-server URL once fully migrated
const PER_PAGE = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(null);

  const endpoint = `${API_BASE_URL}/units?page=${page}&per_page=${PER_PAGE}`;
  const { data, loading, error } = useFetch(endpoint);

  const units = data?.items ?? [];
  const pagination = data?.pagination;

  function onFilter(filterData) {
    setActiveFilters(filterData);
    setPage(1);
  }

  function onSearch() {
    setActiveFilters(null);
    setPage(1);
  }

  // Filtering now operates on units (not apartments). Location filter is
  // replaced with a "shared" toggle; kitchenette/wardrobe/balcony are
  // amenity checkboxes.
  const hasAmenity = (unit, name) =>
    unit.unit_amenity_links?.some((link) => link.amenity?.name === name) ?? false;

  const filteredUnits = activeFilters
    ? units.filter((unit) => {
        const sharedMatches =
          typeof activeFilters.shared === "boolean"
            ? Boolean(unit.shared) === activeFilters.shared
            : true;

        const rent = unit.rent;
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

        const kitchenetteMatches = activeFilters.kitchenette
          ? hasAmenity(unit, "Kitchenette")
          : true;

        const wardrobeMatches = activeFilters.wardrobe
          ? hasAmenity(unit, "Wardrobe")
          : true;

        const balconyMatches = activeFilters.balcony
          ? hasAmenity(unit, "Balcony")
          : true;

        return (
          sharedMatches &&
          rentMatches &&
          bedroomsMatches &&
          kitchenetteMatches &&
          wardrobeMatches &&
          balconyMatches
        );
      })
    : units;

  return (
    <>
      <Navbar showSearch={false} />
      <Filter onSearch={onSearch} onFilter={onFilter} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
        <UnitsGrid units={filteredUnits} loading={loading} error={error} />

        {pagination && !activeFilters && (
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.has_prev}
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-on-surface-variant">
              Page {pagination.page} of {pagination.total_pages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.has_next}
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        <WhySakaKeja />
      </main>
      <Footer />
    </>
  );
}

