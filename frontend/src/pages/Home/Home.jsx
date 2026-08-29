import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer";
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid";
import useFetch from "../../hooks/useFetch";
import Filter from "../../components/FilterComponent/Filter";
import { API_BASE_URL } from "../../config/api";

const PER_PAGE = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(null);

  // Backend currently ignores page/per_page and returns everything —
  // fetch once, paginate client-side.
  const endpoint = `${API_BASE_URL}/units`;
  const { data, loading, error } = useFetch(endpoint);

  const allUnits = data ?? [];

  function onFilter(filterData) {
    setActiveFilters(filterData);
    setPage(1);
  }

  function onSearch() {
    setActiveFilters(null);
    setPage(1);
  }

  const hasAmenity = (unit, name) =>
    unit.unit_amenity_links?.some((link) => link.amenity?.name === name) ?? false;

  const filteredUnits = activeFilters
    ? allUnits.filter((unit) => {
        const sharedMatches =
          typeof activeFilters.shared === "boolean"
            ? Boolean(unit.shared) === activeFilters.shared
            : true;

        const rentMatches = activeFilters.price
          ? Number(unit.rent) <= Number(activeFilters.price)
          : true;

        const bedroomsMatches = activeFilters.bedrooms
          ? activeFilters.bedrooms === "bedsitter"
            ? unit.property_type?.toLowerCase() === "bedsitter"
            : activeFilters.bedrooms === "3+"
              ? Number(unit.bedrooms) >= 3
              : Number(unit.bedrooms) === Number(activeFilters.bedrooms)
          : true;

        const kitchenetteMatches = activeFilters.kitchenette
          ? hasAmenity(unit, "Kitchen")
          : true;

        const wardrobeMatches = activeFilters.wardrobe
          ? hasAmenity(unit, "Wardrobes")
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
    : allUnits;

  // Client-side pagination over the (possibly filtered) list
  const totalPages = Math.max(1, Math.ceil(filteredUnits.length / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const pageUnits = filteredUnits.slice(startIndex, startIndex + PER_PAGE);

  return (
    <>
      <Navbar showSearch={false} />
      <Filter onSearch={onSearch} onFilter={onFilter} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
        <UnitsGrid units={pageUnits} loading={loading} error={error} />

        {!loading && !error && filteredUnits.length > 0 && (
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-on-surface-variant">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
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
