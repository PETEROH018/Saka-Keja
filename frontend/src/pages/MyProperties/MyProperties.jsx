import { useState } from "react";
import { Search } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import OwnerPropertyCard from "../../components/OwnerPropertyCard/OwnerPropertyCard";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";

export default function MyProperties() {

  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const {
    data: properties,
    loading,
    error,
  } = useFetch("http://localhost:3000/apartments");
  const filters = [
    { label: "All Properties", value: "all" },
    { label: "Available", value: "available" },
    { label: "Pending", value: "pending" },
    { label: "Occupied", value: "occupied" },
  ];
  const filterCounts = {
    all: properties?.length ?? 0,
    available: properties?.filter(
      (property) => property.status === "available"
    ).length ?? 0,
    pending: properties?.filter(
      (property) => property.status === "pending"
    ).length ?? 0,
    occupied: properties?.filter(
      (property) => property.status === "occupied"
    ).length ?? 0,
  };
  const filteredProperties = (properties ?? []).filter((property) => {
    const matchesFilter =
      activeFilter === "all" || property.status === activeFilter;

    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      property.name.toLowerCase().includes(searchValue) ||
      property.location.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#faf8fc]">
      <AdminSideBar />

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Properties
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your portfolio, track inquiries, and update availability.
        </p>
        <div className="mt-5 w-full max-w-3xl">
          <div className="relative max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search properties..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${isActive
                    ? "border-violet-200 bg-violet-100 text-violet-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-violet-200 hover:text-violet-700"
                    }`}
                >
                  {filter.label} ({filterCounts[filter.value]})
                </button>
              );
            })}
          </div>
          {loading && <p className="mt-6 text-sm text-gray-500">Loading properties...</p>}

          {
            error && (
              <p className="mt-6 text-sm text-red-500">
                Failed to load properties: {error}
              </p>
            )
          }

          {properties && (
            <div className="mt-6 flex max-w-5xl flex-col gap-4">
              {filteredProperties.map((property) => (
                <OwnerPropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          )}

          {!loading && !error && filteredProperties.length === 0 && (
            <p className="mt-6 text-sm text-gray-500">
              No properties found.
            </p>
          )}


        </div>
      </main>
    </div>
  );
}