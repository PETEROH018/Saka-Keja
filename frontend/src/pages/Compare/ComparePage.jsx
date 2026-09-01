import { useState, useEffect } from "react";
import CompareProperties from "../../components/CompareProperties/CompareProperties";
import PropertySelector from "../../components/CompareProperties/PropertySelector";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API_BASE_URL } from "../../config/api";


export default function ComparePage() {
  const [allApartments, setAllApartments] = useState([]);
  const [selectedIds, setSelectedIds] = useState(null); // null = still choosing

  useEffect(() => {
    fetch(`${API_BASE_URL}/apartments`)
      .then((res) => res.json())
      .then((data) => setAllApartments(data))
      .catch((err) => console.error("Failed to load apartments:", err));
  }, []);

  const selectedProperties = selectedIds
    ? selectedIds.map((id) => allApartments.find((a) => a.id === id)).filter(Boolean)
    : [];

  return (
    <>
      <Navbar />
      {selectedIds === null ? (
        <PropertySelector onCompare={(ids) => setSelectedIds(ids)} />
      ) : (
        <CompareProperties
          properties={selectedProperties}
          onBack={() => setSelectedIds(null)}
        />
      )}
      <Footer />
    </>
  );
}