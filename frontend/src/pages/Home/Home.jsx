import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import WhySakaKeja from "../../components/WhySakaKeja";
import Footer from "../../components/Footer/Footer";
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid";
import useFetch from "../../hooks/useFetch";
import Filter from "../../components/FilterComponent/Filter";
import { API_BASE_URL } from "../../config/api";

const PER_PAGE = 6;

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
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(null);

  const endpoint = `${API_BASE_URL}/units${buildQueryString(activeFilters)}`;
  const { data, loading, error } = useFetch(endpoint);

  const units = data ?? [];

  function onFilter(filterData) {
    setActiveFilters(filterData);
    setPage(1);
  }

  function onSearch() {
    setActiveFilters(null);
    setPage(1);
  }

  // Backend now returns only matching units — paginate client-side
  // since /units still doesn't support page/per_page itself.
  const totalPages = Math.max(1, Math.ceil(units.length / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const pageUnits = units.slice(startIndex, startIndex + PER_PAGE);

  return (
    <>
      <Navbar showSearch={false} />
      <Filter onSearch={onSearch} onFilter={onFilter} />
      <main className="bg-surface text-on-surface font-sans min-h-screen flex flex-col justify-center items-center py-16">
        <UnitsGrid units={pageUnits} loading={loading} error={error} />

        {!loading && !error && units.length > 0 && (
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